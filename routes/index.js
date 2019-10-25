var express = require('express')
var router = express.Router()
const apiRoutes = require('./apiroutes');

// Book routes
router.use("/api", apiRoutes);

module.exports = router;
