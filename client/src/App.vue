<template>
  <div class="container bg-darker">
    <div class="jumbotron bg-darker text-success text-center">
      <h1 class="display-1">Auto Partner</h1>
    </div>
    <Nav :changeView="changeView" :auth="auth"/>
    <div :is="view" :cohort="cohort" :changeView="changeView" :setAuth="setAuth" :setUser="setUser" :user="user"/>
  </div>
</template>

<style scoped>
.bg-darker {
  background-color: #1f1f1f;
}

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
</style>

<script>
import Nav from "./components/Nav.vue";
import CreateCohort from "./views/CreateCohort.vue";
import SelectCohort from "./views/SelectCohort.vue";
import Cohort from "./views/Cohort";
import Home from "./views/Home";
import Login from "./views/Login";

export default {
  name: "App",
  components: {
    Nav,
    CreateCohort,
    SelectCohort,
    Home,
    Login
  },
  data: function() {
    return {
      view: Login,
      cohort: String,
      auth: false,
      user: String
    }
  },
  methods: {
    setUser: function(id) {
      this.user = id;
    },
    changeView: function(event) {
      event.preventDefault();
      const view = event.target.getAttribute("data-view");
      switch(view) {
        case "cohort_create":
          this.view = CreateCohort;
          break;
        case "cohort_select":
          this.view = SelectCohort;
          break;
        case "cohort_selected":
          this.cohort = event.target.getAttribute("data")
          this.view = Cohort;
          break;
        case "login":
          this.view = Login;
          break;
        default:
          this.view = Home;
      }
    },
    setAuth: function(auth) {
      this.auth = auth;
    }
  }
}
</script>