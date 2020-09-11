const mongoose = require("mongoose");
const Cohort = require("../cohort");

// schema structure
const Schema = mongoose.Schema

// create schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  matched: []
})

// add hook to remove student from existing cohorts when a student is deleted
StudentSchema.pre("remove", function (next) {
  Cohort
    .find({},
      {
        $pull: {
          polishes: this._id
        }
      })
    .then(() => {
      next();
    })
})

// create model
const Student = mongoose.model("Student", StudentSchema);

// export model
module.exports = Student;