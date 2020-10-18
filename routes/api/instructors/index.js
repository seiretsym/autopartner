const router = require("express").Router();
const db = require("../../../models");

// path to /api/instructors/
router.route("/")
  .post((req, res) => {
    db.Instructor
      .create(req.body)
      .then(user => {
        user.password = "";
        return res.status(200).json(user);
      })
      .catch(err => {
        console.log(err);
        return res.status(422).json(err);
      })
  })
  .put((req, res) => {
    db.Instructor
      .findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: "User not found" })
        } else if (!user.checkPassword(req.body.password)) {
          return res.status(401).json({ error: "Incorrect Password" })
        } else {
          user.password = "";
          return res.status(200).json(user);
        }
      })
      .catch(err => {
        res.json({ error: err})
      })
  });

// path to /api/routes/instructors/:id
router.route("/:id")
  .get((req, res) => {
    console.log(req.params.id)
    db.Instructor
      .findOne({ _id: req.params.id })
      .populate({
        path: "cohorts",
        populate: [{
          path: "students",
          model: db.Student
        },
        {
          path: "currentPairs",
          model: db.Student
        }]
      })
      .then(data => {
        console.log(data)
        res.json(data)
      })
      .catch(err => {
        console.log(err)
        res.json({ error: err})
      })
  })
  .put((req, res) => {
    switch(req.body.event) {
      case "leave":
        db.Instructor
        .updateOne({ _id: req.params.id },
          {
            $pull: {
              cohorts: req.body.cohortId
            }
          })
        .then(() => {
          res.json(true)
        })
        .catch(() => {
          res.json(false)
        })
        break;
      default:
        db.Instructor
          .updateOne({ _id: req.params.id },
            {
              $push: {
                cohorts: req.body.cohortId
              }
            })
          .then(() => {
            res.json(true)
          })
          .catch(() => {
            res.json(false)
          })
      }
  })

module.exports = router;