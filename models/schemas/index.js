const mongoose = require("mongoose");
// const Student = require("../student");

// schema structure
const Schema = mongoose.Schema

// create schema
const CohortSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }],
  currentPairs: [{
    type: Schema.Types.ObjectId,
    ref: "Student"
  }]
})

// hook to cascade delete students when a cohort is deleted
CohortSchema.pre("deleteOne", function (next) {
  Student
    .deleteMany({ cohort: mongoose.Types.ObjectId(this._conditions._id) })
    .then(() => {
      next();
    })
})

// create schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cohort: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

// hook to remove student from existing cohorts when a student is deleted
StudentSchema.pre("deleteOne", function (next) {
  Cohort
    .findOneAndUpdate({ _id: mongoose.Types.ObjectId(this._conditions.cohort) },
      {
        $pull: {
          students: mongoose.Types.ObjectId(this._conditions._id)
        }
      })
    .then(() => {
      next();
    })
})

// hook to add student to a cohort after a student is created
StudentSchema.post("save", function (next) {
  Cohort
    .findOneAndUpdate({ _id: this.cohort },
      {
        $push: {
          students: this._id
        }
      }, { new: true })
    .then(() => {
      return next;
    })
})

// create model
const Student = mongoose.model("Student", StudentSchema);


// create model
const Cohort = mongoose.model("Cohort", CohortSchema);

// export model
module.exports = { Cohort: Cohort, Student: Student };