const router = require("express").Router();
const db = require("../../../models");

// path to /api/cohorts/
router.route("/")
  .get((req, res) => {
    db.Cohort
      .find({})
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(false);
      })
  })
  .post((req, res) => {
    db.Cohort
      .create(req.body)
      .then(() => {
        res.json(true);
      })
      .catch(() => {
        res.json(false)
      })
  })

module.exports = router