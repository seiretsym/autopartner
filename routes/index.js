const router = require("express").Router();
const api = require("./api");

// path to /api
router.use("/api", api);

// send index.html to client on request for production
if (process.env.NODE_ENV === "production") {
  router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"))
  })
}

module.exports = router;