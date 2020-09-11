const router = require("express").Router();

// path to /api/cohorts/
router.route("/")
  .get((req, res) => {

  })
  .post((req, res) => {
    console.log("made it here");
    res.json(true);
  })
  .put((req, res) => {

  })
module.exports = router