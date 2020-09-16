<template>
  <div class="bg-darkgreen rounded body p-0">
    <div class="nav mt-auto">
      <button class="text-light" v-on:click="rotatePairs">Rotate Pairs</button>
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
    rotatePairs: function() {
      // check if students have been paired before
      if (this.assigned.length > 0) {
        // if they have...
        let odd = [];
        let even = [];
        // split them into odd and evens
        for (let i = 0; i < this.assigned.length; i++) {
          if (i % 2 === 0) {
            odd.push(this.assigned[i])
          } else {
            even.push(this.assigned[i])
          }
        }

        // rotate the students round robin tournament style
        let tempA = odd.pop();
        let tempB = even.shift();
        even.push(tempA);
        let temp = [];
        for (let i = 0; i < odd.length; i++) {
          if (i === 1) {
            temp.push(tempB);
          }
          temp.push(odd[i])
        }
        odd = [...temp];

        // set them up for new pair display
        let newPairs = [];
        for (let i = 0; i < odd.length; i++) {
          newPairs.push(odd[i])
          if (even[i]) {
            newPairs.push(even[i])
          }
        }

        // reassign the current assigned pairs
        this.assigned = [...newPairs];
      } else {
        // if they haven't been assigned yet,
        // split them into odds and evens
        let split = Math.ceil(this.students.length/2);
        let odd = [...this.students.slice(0, split)];
        let even = [...this.students.slice(split, this.students.length)]
        let temp = [];
        // pair them based on the split in a round robin tournament style
        for (let i = 0; i < split; i++) {
          temp.push(odd[i]);
          if (even[i]) {
            temp.push(even[i])
          }
        }

        // assign them
        this.assigned = [...temp];
      }
    },
    savePairs: function() {
      const data = this.assigned.map(student => {
        const temp = {
          _id: student._id,
          name: student.name,
          matched: student.matched,
          cohort: student.cohort
        }
        return temp;
      })
      axios
        .put("/api/students", data)
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