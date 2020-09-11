const mongoose = require("mongoose");
const Student = require("../student");

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
  currentPairs: []
})

// hook to cascade delete students when a cohort is deleted
CohortSchema.pre("deleteOne", function (next) {
  Student
    .deleteMany({ cohort: mongoose.Types.ObjectId(this._conditions._id) })
    .then(() => {
      next();
    })
})

// create model
const Cohort = mongoose.model("Cohort", CohortSchema);

// export model
module.exports = Cohort;