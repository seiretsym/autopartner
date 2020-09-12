const router = require("express").Router();
const db = require("../../../models");

// path to /api/students/
router.route("/")
  .post((req, res) => {
    db.Student
      .create(req.body)
      .then(() => {
        res.json(true);
      })
      .catch(() => {
        res.json(false);
      })
  })
  .put((req, res) => {
    const temp = [];
    req.body.forEach(student => {
      temp.push(student._id);
    })
    db.Cohort
      .updateOne({ _id: req.body[0].cohort }, { $set: { currentPairs: temp } })
      .then(() => {
        Promise.all(req.body.map(student => {
          db.Student
            .updateOne({ _id: student._id }, { $set: { matched: student.matched } })
            .then(() => {
              Promise.resolve(student);
            })
            .catch(() => {
              Promise.reject(student);
            })
        }))
          .then(() => {
            res.json(true);
          })
          .catch(err => {
            console.log(err);
            res.json(false);
          })
      })
      .catch(err => {
        console.log(err);
        res.json(false);
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