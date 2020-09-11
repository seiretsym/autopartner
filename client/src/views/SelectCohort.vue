<template>
<div class="bg-darkgreen p-3 rounded">
  <h1 class="text-light">Select a Cohort</h1>
  <hr class="bg-secondary"/>
  <div v-for="cohort in cohorts" :key="cohort._id" class="d-flex bg-success cohort-list-item rounded">
    <span class="text-light my-auto">{{ cohort.name }}</span>
    <button data-view="cohort_selected" :data="cohort._id" v-on:click="changeView" class="ml-auto btn bg-darkgreen text-light">Select</button>
    <button v-on:click="deleteCohort" :data="cohort._id" class="ml-3 btn bg-darkgreen text-light">Delete</button>
  </div>
</div>
</template>

<style scoped>
button:hover,
button:focus {
  outline: none;
  box-shadow: none;
  position: relative;
  background-color: #275227;
  z-index: 10;
}

span {
  pointer-events: none;
}

.bg-darkgreen {
  background-color: #1c351c;
}

.cohort-list-item {
  padding: 15px;
  margin-bottom: 15px;
}

.cohort-list-item:hover {
  background-color: #292929;
}

.cohort-list-item:nth-last-child(1) {
  margin-bottom: 0px;
}

</style>

<script>
const axios = require("axios");

export default {
  name: 'SelectCohort',
  props: {
    changeView: Function
  },
  data: function() {
    return {
      cohorts: Array
    }
  },
  methods: {
    deleteCohort: function(event) {
      event.preventDefault();
      const id = event.target.getAttribute("data")
      axios
        .delete(`/api/cohorts/${id}`)
        .then(() => {
          alert("Cohort Deleted.")
          this.getCohorts();
        })
        .catch(() => {
          alert("Error: Cannot delete Cohort. Please contact Administrator.")
        })
    },
    getCohorts: function() {
      axios
        .get("/api/cohorts")
        .then(({ data }) => {
          this.cohorts = data;
      })
    }
  },
  mounted() {

  }
}
</script>