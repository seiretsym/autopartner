const router = require("express").Router();
const cohorts = require("./cohorts");
const students = require("./students");

// path to /api/cohorts
router.route("/cohorts", cohorts);

// path to /api/students
router.route("/students", students);

module.exports = router;