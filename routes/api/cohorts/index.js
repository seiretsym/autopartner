const router = require("express").Router();
const db = require("../../../models");

// path to /api/cohorts/
router.route("/")
  .get((req, res) => {
    db.Cohort
      .find({})
      .populate("currentPairs")
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
      .then(data => {
        db.Instructor
          .updateOne({ _id: req.body.owner },
            {
              $push: { cohorts: data._id }
            })
          .then(() => {
            res.json(true);
          });
      })
      .catch(() => {
        res.json(false)
      })
  });

router.route("/:id")
  .get((req, res) => {
    db.Cohort
      .find({ _id: req.params.id })
      .populate("students")
      .populate("currentPairs")
      .then(data => {
        res.json(data);
      })
      .catch(() => {
        res.json(false);
      })
  })
  .delete((req, res) => {
    db.Cohort
      .deleteOne({ _id: req.params.id })
      .then((data) => {
        console.log(data)
        res.json(true);
      })
      .catch((err) => {
        console.log(err);
        res.json(false);
      })
  });

module.exports = router;