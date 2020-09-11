<template>
  <div class="bg-darkgreen rounded">
    <div class="d-flex">
    <h1 class="text-light mt-auto mb-0">Cohort View</h1>
      <div class="nav mt-auto ml-3">
        <button class="text-light" v-on:click="changeView" data-view="assigned_pairs">Assigned Pairs</button>
        <button class="text-light" v-on:click="changeView" data-view="view_students">View Students</button>
        <button class="text-light" v-on:click="changeView" data-view="add_students">Add Students</button>
      </div>
    </div>
    <hr class="bg-secondary"/>
    <div :is="view" :cohort="cohort" :changeView="changeView"/>
  </div>
</template>

<style scoped>
.bg-darkgreen {
  background-color: #1c351c;
  padding: 15px;
}

button {
  background-color: transparent;
  border: none;
  outline: none;
}

button:hover {
  color: #e0e0e0 !important;
  text-decoration: underline;
}
</style>

<script>
import AssignedPairs from "./AssignedPairs";
import AddStudents from "./AddStudents";
import ViewStudents from "./ViewStudents";

export default {
  name: "Cohort",
  props: {
    cohort: String,
  },
  data: function() {
    return {
      view: AssignedPairs,
    }
  },
  methods: {
    changeView: function(event) {
      event.preventDefault();
      switch(event.target.getAttribute("data-view")) {
        case "view_students":
          this.view = ViewStudents;
          break;
        case "add_students":
          this.view = AddStudents;
          break;
        default:
          this.view = AssignedPairs;
      }
    }
  }
}
</script>