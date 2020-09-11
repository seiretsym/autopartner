<template>
  <div class="bg-darkgreen rounded">
    <div class="d-flex">
    <h1 class="text-light mt-auto mb-0">Cohort View</h1>
      <div class="nav mt-auto ml-3">
        <button class="text-light">View Students</button>
        <button class="text-light">Add Students</button>
      </div>
    </div>
    <hr class="bg-secondary"/>
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
export default {
  name: "Cohort",
  props: {
    cohort: String,
  }
}
</script>