<template>
<div class="bg-darkgreen rounded">
  <h1 class="text-light">Create a Cohort</h1>
  <hr class="bg-secondary"/>
  <form>
    <div class="form-group">
      <label for="name" class="text-light">Cohort Name</label>
      <input type="name" class="form-control" id="name" aria-describedby="name" ref="cohortName">
      <small class="form-text text-muted">Pick a name to help identify your cohort.</small>
    </div>
    <button type="submit" v-on:click="createCohort" data-view="cohort_select" class="btn btn-success">Submit</button>
  </form>
</div>
</template>

<style scoped>
.bg-darkgreen {
  background-color: #1c351c;
  padding: 15px;
}
</style>

<script>
const axios = require("axios");

export default {
  name: 'CreateCohort',
  props: {
    changeView: Function,
    user: String
  },
  methods: {
    createCohort: function(event) {
      event.preventDefault();
      const newCohort = {
        name: this.$refs.cohortName.value,
        owner: this.user
      }
      axios
        .post("/api/cohorts", newCohort)
        .then(data => {
          alert("New Cohort Added");
          this.changeView(event);
          this.$refs.cohortName.value = "";
        })
        .catch(() => {
          alert("Unable to add a new cohort.")
        })
    }
  }
}
</script>