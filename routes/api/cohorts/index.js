const router = require("express").Router();
const db = require("../../../models");

// path to /api/cohorts/
router.route("/")
  .get((req, res) => {
    console.log("?")
    res.json("true");
  })
  .post((req, res) => {
    console.log("made it here");
    res.json(true);
  })

module.exports = router