const mongoose = require("mongoose");

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
  }]
})

// create model
const Cohort = mongoose.model("Cohort", CohortSchema);

// export model
module.exports = Cohort;