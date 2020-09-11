<template>
  <div class="bg-darkgreen rounded pr-3 p-0 body">
    <h3 class="text-light mt-auto mb-0">Students</h3>
    <ul class="list-group">
      <div class="input-group my-1" v-for="(student, i) in students" :key="student.name">
        <div class="input-group-prepend">
          <span v-if="i < 9" class="input-group-text bg-info text-light font-weight-bold">0{{ i + 1 }}</span>
          <span v-else class="input-group-text bg-info text-light font-weight-bold">{{ i + 1 }}</span>
        </div>
        <li class="form-control bg-success text-light">
          {{ student.name }}
        </li>
        <div class="input-group-append">
          <button class="bg-danger input-group-text text-light" v-on:click="removeStudent" :data-name="student.name" :data="student._id">&times;</button>
        </div>
      </div>
    </ul>
  </div>
</template>

<style scoped>
.input-group-text,
.form-control {
  border-color: #1c351c;
}

.body {
  height: 485px;
  overflow: auto;
}

button {
  border-color: #1c351c;
}

button:active,
button:focus {
  outline: none;
}

</style>

<script>
const axios = require("axios");

export default {
  name: "ViewStudents",
  props: {
    cohort: String,
  },
  data: function() {
    return {
      students: Array
    }
  },
  methods: {
    removeStudent: function(event) {
      event.preventDefault();
      const id = event.target.getAttribute("data")
      axios
        .delete(`/api/students/${id}/${this.cohort}`)
        .then(() => {
          this.getStudents();
          alert(`${event.target.getAttribute("data-name")} has been removed from the roster`)
        })
        .catch(() => {
          alert("Error: Cannot remove student from roster. Contact Administrator.")
        })
    },
    getStudents: function() {
      axios
      .get(`/api/cohorts/${this.cohort}`)
      .then(({ data }) => {
        this.students = [...data[0].students];
      })
    }
  },
  mounted() {
    this.getStudents();
  }
}
</script>