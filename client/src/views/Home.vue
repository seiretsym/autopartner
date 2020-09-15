<template>
<div class="bg-darkgreen p-3 body rounded">
  <h1 class="text-light">Current Cohorts</h1>
  <hr class="bg-secondary"/>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <label class="input-group-text bg-success text-light">Select a Cohort</label>
    </div>
    <select class="custom-select bg-light text-success border-success" v-on:change="loadStudents">
      <template v-for="(cohort, i) in cohorts">
        <option v-if="i === 0" :value="i" :key="i" selected>{{ cohort.name }}</option>
        <option v-else :value="i" :key="i">{{ cohort.name }}</option>
      </template>
    </select>
  </div>
  <div class="student-list">
    <template v-for="(student, i) in selectedCohort">
      <ul v-if="i % 2 === 0" class="list-group room" :key="i">
        <li v-if="i % 2 === 0" class="list-group-item bg-success text-light font-weight-bold">Breakout Room {{ Math.round(i / 2 + 1) }}</li>
        <li class="list-group-item"> {{ student.name }} </li>
        <li v-if="selectedCohort[i+1]" class="list-group-item"> {{ selectedCohort[i+1].name }} </li>
      </ul>
    </template>
  </div>
</div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 15px;
  background: #1c351c;
}

::-webkit-scrollbar-thumb {
  background: #28A745;
  border-radius: 15px;
}

::-webkit-scrollbar-track {
  background: #1c351c;
}

.bg-darkgreen {
    background-color: #1c351c;
}

.room {
  width: 24%;
  margin: 10px 0.6667% 10px 0px;
}

.room:nth-child(4n+2),
.room:nth-child(4n+3),
.room:nth-child(4n-1),
.room:nth-child(4n-2) {
  margin: 10px 0.6667% 10px 0.6667%;
}

.room:nth-child(4n) {
  margin: 10px 0px 10px 0.6667%;
} 

.student-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-height: 429px;
  overflow: auto;
  padding-right: 15px;
}

.input-group-text,
.custom-select {
  border-color: #1c351c !important;
}

.body {
  height: 596px;
}
</style>

<script>
const axios = require("axios");

export default {
  name: "Home",
  data: function() {
    return {
      cohorts: Array,
      selectedCohort: Array,
    }
  },
  methods: {
    getCohorts: function() {
      axios
        .get("/api/cohorts")
        .then(({ data }) => {
          this.cohorts = [...data];
          this.selectedCohort = [...this.cohorts[0].currentPairs]
        })
        .catch(err => {
          alert("Error: Failed to retrieve cohort information. Please contact administrator.")
        })
    },
    loadStudents: function(event) {
      const i = parseInt(event.target.value);
      this.selectedCohort = [...this.cohorts[i].currentPairs];
    }
  },
  mounted() {
    this.getCohorts();
  }
}
</script>