<template>
<div class="bg-darkgreen rounded">
  <h1 class="text-light">Create a Cohort</h1>
  <hr class="bg-secondary"/>
  <form>
    <div class="form-group">
      <label for="name" class="text-light">Cohort Name</label>
      <input type="name" class="form-control" id="name" aria-describedby="name" ref="cohortName">
      <small id="emailHelp" class="form-text text-muted">Pick a name to help identify your cohort.</small>
    </div>
    <button type="submit" v-on:click="createCohort" class="btn btn-success">Submit</button>
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
  methods: {
    createCohort: function(event) {
      event.preventDefault();
      const newCohort = {
        name: this.$refs.cohortName.value
      }
      console.log(newCohort);
      axios
        .post("/api/cohorts", newCohort)
        .then(data => {
          console.log(data);
        })
    }
  }
}
</script>