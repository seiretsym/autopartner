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

module.exports = router