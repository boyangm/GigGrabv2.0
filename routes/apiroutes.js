var express = require('express')
var router = express.Router()
const userController = require('../controller/userController');
 
router.route('/users')
    .post(userController.create)
    .get(userController.findAll)
    .put(userController.update)


module.exports = router;