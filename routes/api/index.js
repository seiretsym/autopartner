const router = require("express").Router();
const cohorts = require("./cohorts");
const students = require("./students");

// path to /api/cohorts
router.use("/cohorts", cohorts);

// path to /api/students
router.use("/students", students);

module.exports = router;