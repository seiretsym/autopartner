<template>
  <div class="bg-darkgreen rounded body p-0">
    <div class="nav mt-auto">
      <button class="text-light" v-on:click="randomizePairs">Randomize Pairs</button>
      <button class="text-light" v-on:click="savePairs">Save Pairs</button>
    </div>
    <hr class="bg-secondary"/>
    <div class="student-list">
      <template v-for="(student, i) in assigned">
        <ul v-if="i % 2 === 0" class="list-group room p-0" :key="i">
          <li v-if="i % 2 === 0" class="list-group-item bg-success text-light font-weight-bold">Breakout Room {{ Math.round(i / 2 + 1) }}</li>
          <li class="list-group-item"> {{ student.name }} </li>
          <li v-if="assigned[i+1]" class="list-group-item"> {{ assigned[i+1].name }} </li>
        </ul>
      </template>
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

button {
  background-color: transparent;
  border: none;
  outline: none;
}

button:hover {
  color: #e0e0e0 !important;
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
  overflow: auto;
  max-height: 425px;
  padding-right: 15px;
}

.body {
  height: 485px;
}
</style>

<script>
const axios = require("axios");

export default {
  name: "AssignedPairs",
  props: {
    cohort: String,
  },
  data: function() {
    return {
      students: Array,
      assigned: Array,
      rooms: Number,
    }
  },
  watch: {
    students: function() {
      this.rooms = Math.round(this.students / 2);
    }
  },
  methods: {
    randomizePairs: function() {
      // let left = [];
      // let right = [];
      // let temp = [];
      // let store = [...this.students]

      // // randomly split students into left and right arrays
      // while (store.length > 0) {
      //   let rng = Math.floor(Math.random() * store.length);
        
      //   // guarantees that students are split evenly
      //   if (store.length % 2 === 0) {
      //     left.push(store[rng])
      //   } else {
      //     right.push(store[rng])
      //   }

      //   // remove student from store after placement
      //   store = store.filter(student => student._id !== store[rng]._id)
      // }

      
      // console.log("Left: ", left)
      // console.log("right", right)

      let temp = [];
      let limit = 0;
      let resetCount = 0;
      let store = [...this.students]
      if (this.students[0].matched.length === this.students.length - 1) {
        alert("Students have paired with everyone at least once. Resetting count.")
        this.students.map(student => {
          student.matched = [];
          return student;
        })
        store = [...this.students];
      }
      while (temp.length < this.students.length) {
        const rng = Math.floor(Math.random() * store.length);
        if (limit < 50) {
          limit++
        } else {
          console.log("limit")
          if (resetCount === 50) {
            resetCount = 0;
            alert("Algorithm taking too long. Resetting matches.")
            this.students.map(student => {
              student.matched = [];
              return student;
            })
            store = [...this.students];
          } else {
            resetCount++
            limit = 0;
            temp = [];
            store = [...this.students];
          }
        }
        if (temp.length > 0) {
          if (temp.findIndex(student => student._id === store[rng]._id) < 0) {
            if (temp.length % 2 === 1) {
              if (temp[temp.length-1].matched.findIndex(id => id === store[rng]._id) < 0) {
                temp.push(store[rng]);
                store = store.filter((student, i) => i !== rng)
              } else {
                if (temp.length === this.students.length - 1) {
                  console.log("reset")
                  temp = [];
                  store = [...this.students];
                }
              }
            } else {
              temp.push(store[rng]);
              store = store.filter((student, i) => i !== rng)
            }
          }
        } else {
          temp.push(store[rng])
          store = store.filter((student, i) => i !== rng)
        }
      }
      this.assigned = [...temp]
    },
    savePairs: function() {
      for (let i = 0; i < this.assigned.length; i++) {
        if (i % 2 === 0) {
          if (this.assigned[i+1]) {
            this.assigned[i].matched.push(this.assigned[i+1]._id);
            this.assigned[i+1].matched.push(this.assigned[i]._id);
          }
        }
      }
      const temp = this.assigned.map(student => {
        const data = {
          _id: student._id,
          name: student.name,
          matched: student.matched,
          cohort: student.cohort
        }
        return data;
      })
      axios
        .put("/api/students", temp)
        .then(() => {
          this.getStudents();
          alert("Assignments Saved")
        })
        .catch(() => {
          alert("Error: Error saving pair assignments. Contact Administrator.")
        })
    },
    getStudents: function() {
      axios
        .get(`/api/cohorts/${this.cohort}`)
        .then(({ data }) => {
          this.students = [...data[0].students];
          this.assigned = [...data[0].currentPairs];
        })
    }
  },
  mounted() {
    this.getStudents();
  }
}
</script>