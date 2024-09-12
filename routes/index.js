const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./api/user-routes");
const thoughtRoutes = require("./api/thought-routes");

router.use("/api", apiRoutes);

router.use("/api/user", userRoutes);
router.use("/api/thought", thoughtRoutes);

router.use((req, res) => {
    res.status(404).send("404 Error");
});

module.exports = router;