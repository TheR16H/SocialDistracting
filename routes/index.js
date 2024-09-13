const router = require("express").Router();
const apiRoutes = require("./api"); // This imports the index.js from the api folder

router.use("/api", apiRoutes); // This will now work

router.use((req, res) => {
    res.status(404).send("404 Error");
});

module.exports = router;