const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// schema structure
const Schema = mongoose.Schema

// create cohort schema
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

// create student schema
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

// create instructor model
const InstructorSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cohorts: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Cohort"
  }
})

// create hook to hash instructor passwords as accounts are created
InstructorSchema.pre("save", function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
  }
  return next();
})

// method for checking instructor password
InstructorSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

// create model
const Student = mongoose.model("Student", StudentSchema);
const Cohort = mongoose.model("Cohort", CohortSchema);
const Instructor = mongoose.model("Instructor", InstructorSchema);

// export model
module.exports = {
  Cohort: Cohort,
  Student: Student,
  Instructor: Instructor
};