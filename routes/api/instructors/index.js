const router = require("express").Router();
const db = require("../../../models");

// path to /api/instructors/
router.route("/")
  .post((req, res) => {
    db.Instructor
      .create(req.body)
      .then(user => {
        res.json({
          ...user,
          password: ""
        });
      })
      .catch(err => {
        res.json({ error: err })
      })
  })
  .put((req, res) => {
    db.Instructor
      .findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          return res.json({ error: "User not found" })
        } else if (!user.checkPassword(req.body.password)) {
          return res.json({ error: "Incorrect Password" })
        } else {
          return res.json({ 
            ...user,
            password: "",
            success: true
          });
        }
      })
      .catch(err => {
        res.json({ error: err})
      })
  });

// path to /api/routes/instructors/:id
router.route("/:id")
  .get((req, res) => {
    db.Instructor
      .findOne({ _id: req.params.id })
      .populate("cohorts")
      .then(user => {
        res.json({
          ...user,
          password: ""
        })
      })
      .catch(err => {
        res.json({ error: err})
      })
  })

module.exports = router;