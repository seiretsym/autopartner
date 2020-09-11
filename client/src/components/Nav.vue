<template>
  <nav class="navbar navbar-expand-lg navbar-success bg-success rounded mb-3">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <button class="nav-link bg-success text-light" v-on:click="changeView" data="null">Home</button>
      </li>
      <li class="nav-item dropdown">
        <button class="nav-link dropdown-toggle bg-success text-light" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Cohort
        </button>
        <div class="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
          <button class="dropdown-item text-light" v-on:click="changeView" data="cohort_create">Create New</button>
          <button class="dropdown-item text-light" v-on:click="changeView" data="cohort_select">Select Cohort</button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.dropdown-item:hover {
  background-color: #227235 !important;
}

.text-light:hover {
  color: #e0e0e0 !important
}

button,
button:hover,
button:active,
button:focus {
  background-color: transparent !important;
  border: none;
  outline: none;
}
</style>

<script>
export default {
  name: 'Nav',
  props: {
    changeView: Function
  }
}
</script>