<template>
  <div class="bg-darkgreen rounded">
  <form>
    <div v-for="(student, i) in students" :key="i" class="form-group">
      <label for="name" class="text-light">Student Name</label>
      <div class="input-group">
        <input type="name" class="form-control name" aria-describedby="name" :value="student" v-on:input="handleInput" :data="i"/>
        <div class="input-group-append">
          <button class="btn btn-danger input-group-text text-danger" v-on:click="removeStudent" :data="i">&times;</button>
        </div>
      </div>
      <small id="emailHelp" class="form-text text-muted">Enter student's name</small>
    </div>
    <button v-on:click="addMoreStudents" class="btn btn-success mr-3">+</button>
    <hr class="bg-secondary"/>
    <button v-on:click="saveStudents" ref="saveBtn" class="btn btn-success disabled">Submit</button>
  </form>
</div>
</template>

<style scoped>
input:focus {
  border-color: green;
  box-shadow: none;
}

.disabled {
  background-color: darkgreen;
  pointer-events: none;
}
</style>

<script>
const axios = require("axios");

export default {
  name: "AddStudents",
  props: {
    cohort: String,
  },
  data: function() {
    return {
      students: [""],
    }
  },
  watch: {
    students: function() {
      if (this.students.indexOf("") === -1 && this.students.length > 0) {
        this.$refs.saveBtn.classList.remove("disabled");
      } else {
        this.$refs.saveBtn.classList.add("disabled");
      }
    }
  },
  methods: {
    addMoreStudents: function(event) {
      event.preventDefault();
      this.students.push("")
    },
    saveStudents: function(event) {
      event.preventDefault();
      const students = []
      this.students.forEach(student => {
        if (student.trim() !== "") {
          students.push({
          name: student,
          cohort: this.cohort
          })
        }
      })
      axios
        .post("/api/students", students)
        .then(() => {
          alert("Students added to cohort.")
        })
        .catch(() => {
          alert("Problem adding students to cohort. Please check input fields.")
        })
    },
    removeStudent: function(event) {
      event.preventDefault();
      const index = parseInt(event.target.getAttribute("data"));
      this.students = this.students.filter((student, i) => i !== index)
    },
    handleInput: function(event) {
      event.preventDefault();
      const i = parseInt(event.target.getAttribute("data"))
      const newData = [...this.students]
      newData[i] = event.target.value;
      return (this.students = [...newData]);
    }
  }
}
</script>