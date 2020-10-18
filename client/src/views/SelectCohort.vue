<template>
  <div class="bg-darkgreen p-3 rounded">
    <h1 class="text-light">Select a Cohort</h1>
    <hr class="bg-secondary"/>
    <template v-if="myCohorts.length > 0">
    <h5 class="text-light">My Cohorts</h5>
      <div v-for="cohort in myCohorts" :key="cohort._id" class="d-flex bg-success cohort-list-item rounded">
        <span class="text-light my-auto">{{ cohort.name }}</span>
        <template v-if="user === cohort.owner">
          <button data-view="cohort_selected" :data="cohort._id" v-on:click="changeView" class="ml-auto btn bg-darkgreen text-light w-10">Select</button>
          <button v-on:click="deleteCohort" :data="cohort._id" class="ml-3 btn bg-darkgreen text-light w-10">Delete</button>
        </template>
        <template v-else>
          <button v-on:click="leaveCohort" :data="cohort._id" class="ml-auto btn bg-darkgreen text-light w-10">Leave</button>
        </template>
      </div>
    </template>
    <template v-if="cohorts.length > 0">
      <h5 class="text-light">Other Cohorts</h5>
      <div v-for="cohort in cohorts" :key="cohort._id + 'o'" class="d-flex bg-success cohort-list-item rounded">
        <span class="text-light my-auto">{{ cohort.name }}</span>
        <button :data="cohort._id" v-on:click="addCohort" class="ml-auto btn bg-darkgreen text-light w-10">Join</button>
      </div>
    </template>
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

.w-10 {
  width: 100%;
  max-width: 80px;
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
    changeView: Function,
    user: String
  },
  data: function() {
    return {
      cohorts: Array,
      myCohorts: Array
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
        .get(`/api/instructors/${this.user}`)
        .then(({ data }) => {
          this.myCohorts = data.cohorts;
          axios
            .get("/api/cohorts")
            .then(({ data }) => {
              let filtered = data;
              this.myCohorts.forEach(myCohort => {
                filtered = filtered.filter(filter => filter._id !== myCohort._id);
              })
              this.cohorts = filtered;
          })
        })
    },
    addCohort: function(event) {
      const id = event.target.getAttribute("data");
      axios
        .put(`/api/instructors/${this.user}`, { cohortId: id, event: "join" })
        .then(() => {
          this.getCohorts();
          alert("Cohort Added.")
        })
        .catch(() => {
          alert("Error joining cohort.")
        })
    },
    leaveCohort: function(event) {
      const id = event.target.getAttribute("data");
      axios
        .put(`/api/instructors/${this.user}`, { cohortId: id, event: "leave" })
        .then(() => {
          this.getCohorts();
          alert("Left Cohort.")
        })
        .catch(() => {
          alert("Error leaving cohort.")
        })
    }
  },
  mounted() {
    this.getCohorts();
  }
}
</script>