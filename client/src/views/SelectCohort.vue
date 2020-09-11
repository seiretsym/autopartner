<template>
<div class="bg-darkgreen rounded">
  <h1 class="text-light">Select a Cohort</h1>
  <hr class="bg-secondary"/>
  <div v-for="cohort in cohorts" :key="cohort._id" data-view="cohort_selected" :data="cohort._id" class="bg-darker cohort-list-item rounded" v-on:click="changeView">
    <span class="text-light">{{ cohort.name }}</span>
  </div>
</div>
</template>

<style scoped>
.bg-darkgreen {
  background-color: #1c351c;
  padding: 15px;
}

.bg-darker {
  background-color: #1f1f1f;
}

.cohort-list-item {
  padding: 15px;
  margin-bottom: 15px;
  cursor: pointer;
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
  mounted() {
    axios
      .get("/api/cohorts")
      .then(({ data }) => {
        this.cohorts = data;
      })
  }
}
</script>