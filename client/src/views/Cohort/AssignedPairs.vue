<template>
  <div class="bg-darkgreen rounded body pr-3 p-0">
    <div class="nav mt-auto">
      <button class="text-light" data-view="assigned_pairs">Assign Pairs</button>
      <button class="text-light" data-view="view_students">Save Pairs</button>
    </div>
    <hr class="bg-secondary"/>
    <div class="student-list">
      <template v-for="(student, i) in assigned">
        <ul v-if="i % 2 === 0" class="list-group room" :key="i">
          <li v-if="i % 2 === 0" class="list-group-item bg-success text-light font-weight-bold">Breakout Room {{ Math.round(i / 2 + 1) }}</li>
          <li class="list-group-item"> {{ student.name }} </li>
          <li v-if="students[i+1]" class="list-group-item"> {{ students[i+1].name }} </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: transparent;
  border: none;
  outline: none;
}

button:hover {
  color: #e0e0e0 !important;
  text-decoration: underline;
}

.room {
  width: 23%;
  margin: 10px 1%;
}

.student-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.body {
  height: 485px;
  overflow: auto;
}
</style>

<script>
const axios = require("axios");

export default {
  name: "AssignedPairs",
  props: {
    cohort: String,
  },
  data: function() {
    return {
      students: Array,
      assigned: Array,
      rooms: Number,
    }
  },
  watch: {
    students: function() {
      this.rooms = Math.round(this.students / 2);
    }
  },
  methods: {
    randomizePairs: function() {
      const temp = [];
        for (let i = 0; i < this.students.length; i++) {
          
        }
    },
    getStudents: function() {
      axios
        .get(`/api/cohorts/${this.cohort}`)
        .then(({ data }) => {
          this.students = [...data[0].students];
          this.assigned = [...data[0].currentPairs];
        })
    }
  },
  mounted() {
    this.getStudents();
  }
}
</script>