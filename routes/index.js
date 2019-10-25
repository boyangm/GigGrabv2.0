const router = require("express").Router();
const apiRoutes = require("./apiroutes");

// Book routes
router.use("/api", apiRoutes);

module.exports = router;
