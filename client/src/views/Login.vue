<template>
  <div class="bg-darkgreen p-3 body rounded">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <template v-if="view==='login'">
        <div class="form-group">
          <form>
            <input type="username" class="form-control mt-5" placeholder="username" autocomplete="l-username" ref="userL"/>
            <input type="password" class="form-control my-3" placeholder="password" autocomplete="l-password" ref="passL"/>
            <div class="d-flex">
              <input type="submit" class="btn btn-success" v-on:click="login" value="Login">
              <div class="mt-auto ml-auto text-light">
                Don't have an account?
                <span v-on:click="(event) => changeView(event, 'register')" class="text-success link">
                  Register Here
                </span>
              </div>
            </div>
          </form>
        </div>
        </template>
        <template v-else>
          <div class="form-group">
          <form>
            <input type="username" class="form-control mt-5" placeholder="username" autocomplete="r-username" ref="userR"/>
            <input type="password" class="form-control my-3" placeholder="password" autocomplete="r-password" ref="passR"/>
            <input type="password" class="form-control mb-3" placeholder="confirm password" autocomplete="r-confirm" ref="confR"/>
            <div class="d-flex">
              <input type="submit" class="btn btn-success" v-on:click="register" value="Register">
              <div class="mt-auto ml-auto text-light">
                Already registered?
                <span v-on:click="(event) => toggleView(event, 'login')" class="text-success link">
                  Login
                </span>
              </div>
            </div>
          </form>
        </div>
        </template>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<style scoped>
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

.bg-darkgreen {
    background-color: #1c351c;
}

span.link {
  cursor: pointer;
}

span.link:hover {
  text-decoration: underline;
}

.room {
  width: 24%;
  margin: 10px 0.6667% 10px 0px;
}

.room:nth-child(4n+2),
.room:nth-child(4n+3),
.room:nth-child(4n-1),
.room:nth-child(4n-2) {
  margin: 10px 0.6667% 10px 0.6667%;
}

.room:nth-child(4n) {
  margin: 10px 0px 10px 0.6667%;
} 

.student-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  max-height: 429px;
  overflow: auto;
  padding-right: 15px;
}

.input-group-text,
.custom-select {
  border-color: #1c351c !important;
}

.body {
  height: 596px;
}
</style>

<script>
const axios = require("axios");

export default {
  name: "Login",
  data: function() {
    return {
      view: "login"
    };
  },
  props: {
    setAuth: Function,
    changeView: Function
  },
  methods: {
    toggleView: function(event, view) {
      event.preventDefault();
      this.view = view;
    },
    login: function(event) {
      event.preventDefault();
      const userL = this.$refs.userL;
      const passL = this.$refs.passL;
      // validate inputs
      if (userL.value.length < 1) {
        userL.setAttribute("placeholder", "Username cannot be empty");
        userL.focus();
      } else if (passL.value.length < 1) {
        passL.setAttribute("placeholder", "Password cannot be empty");
        passL.focus();
      } else {
        const user = {
          username: userL.value.toLowerCase(),
          password: passL.value
        }
        axios
          .put("/api/instructors", user)
          .then(({ data }) => {
            console.log(data);
            this.setAuth(true);
            this.changeView(event);
          })
          .catch(err => {
            const error = "" + err;
            if (error.match("404")) {
              userL.value = "";
              userL.setAttribute("placeholder", "username not found");
              userL.focus();
            } else if (error.match("401")) {
              passL.value = "";
              passL.setAttribute("placeholder", "incorrect password");
              passL.focus();
            }
          })
      }
    },
    register: function(event) {
      event.preventDefault();
      // validate inputs
      const userR = this.$refs.userR;
      const passR = this.$refs.passR;
      const confR = this.$refs.confR;
      // validate username
      if (userR.value.length < 4) {
        userR.value = "";
        userR.setAttribute("placeholder", "Username must be at least 4 characters");
        userR.focus();
      } else if (!RegExp(/^[a-zA-Z][a-zA-Z0-9]+$/).test(userR.value)) {
        userR.value = "";
        userR.setAttribute("placeholder", "Username must be alphanumeric and start with a letter")
        userR.focus();
      }
      
      // validate password
      else if (passR.value.length < 6) {
        passR.value = "";
        confR.value = "";
        passR.setAttribute("placeholder", "Password must be at least 6 characters");
        passR.focus();
      }

      // validate confirm
      else if (confR.value !== passR.value) {
        confR.value = "";
        confR.setAttribute("placeholder", "This must match the password above");
        confR.focus();
      }

      // all good? let's register
      else {
        const user = {
          username: userR.value.toLowerCase(),
          password: passR.value
        }
        axios
          .post("/api/instructors", user)
          .then(({ data }) => {
            console.log(data);
            this.setAuth(true);
            this.changeView(event);
          })
          .catch(error => {
            userR.value = "";
            userR.setAttribute("placeholder", "username already in use");
            userR.focus();
          })
      }
    }
  }
};
</script>