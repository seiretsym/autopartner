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

router.route("/:id")
  .delete((req, res) => {
    db.Student
      .deleteOne({ _id: req.params.id })
      .then(() => {
        res.json(true)
      })
      .catch(() => {
        res.json(false)
      })
  })

module.exports = router