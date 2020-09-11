const router = require("express").Router();
const db = require("../../../models");

// path to /api/students/
router.route("/")
  .post((req, res) => {
    db.Student
      .create(req.body)
      .then(() => {
        res.json(true)
      })
      .catch(() => {
        res.json(false)
      })
  })

router.route("/:id/:cohort")
  .delete((req, res) => {
    db.Student
      .deleteOne({ _id: req.params.id, cohort: req.params.cohort })
      .then((data) => {
        console.log(data);
        res.json(true)
      })
      .catch((err) => {
        console.log(err);
        res.json(false)
      })
  })

module.exports = router