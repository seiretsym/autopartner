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
  cohort: {
    type: Schema.Types.ObjectId,
    required: true
  },
  matched: []
})

// hook to remove student from existing cohorts when a student is deleted
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

// hook to add student to a cohort after a student is created
StudentSchema.post("save", function (next) {
  Cohort
    .findOneAndUpdate({ _id: this.cohort },
      {
        $push: {
          students: this._id
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