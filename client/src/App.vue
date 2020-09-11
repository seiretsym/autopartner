<template>
  <div class="container bg-darker">
    <div class="jumbotron bg-darker text-success text-center">
      <h1 class="display-1">Auto Partner</h1>
    </div>
    <Nav :changeView="changeView" />
    <div :is="view"/>
  </div>
</template>

<style scoped>

.bg-darker {
  background-color: #1f1f1f;
}
</style>

<script>
import Nav from "./components/Nav.vue";
import CreateCohort from "./views/CreateCohort.vue";
import SelectCohort from "./views/SelectCohort.vue"

export default {
  name: "App",
  components: {
    Nav,
    CreateCohort,
    SelectCohort
  },
  data: function() {
    return {
      view: null,
    }
  },
  methods: {
    changeView: function(event) {
      event.preventDefault();
      const view = event.target.getAttribute("data");
      switch(view) {
        case "cohort_create":
          this.view = CreateCohort;
          break;
        case "cohort_select":
          this.view = SelectCohort;
          break;
        default:
          this.view = null;
      }
    }
  }
}
</script>