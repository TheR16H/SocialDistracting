const router = require("express").Router();
const userRoutes = require("./api/user-routes");
const thoughtRoutes = require("./api/thought-routes");

router.use("/api", apiRoutes);

router.use("/api/users", userRoutes);
router.use("/api/thoughts", thoughtRoutes);

router.use((req, res) => {
    res.status(404).send("404 Error");
});

module.exports = router;