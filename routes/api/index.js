const router = require("express").Router();
const cohorts = require("./cohorts");
const students = require("./students");
const instructors = require("./instructors");

// path to /api/cohorts
router.use("/cohorts", cohorts);

// path to /api/students
router.use("/students", students);

// path to /api/instructors
router.use("/instructors", instructors)

module.exports = router;