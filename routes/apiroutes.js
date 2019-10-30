var express = require('express')
var router = express.Router()
const userController = require('../controller/userController');
const gigController = require('../controller/gigcontroller');
router.route('/users')
    .post(userController.create)
    .get(userController.findAll)
    .put(userController.update)

router.post('/login',userController.login)
router.route('/gigs')
    .post(gigController.create)
    .get(gigController.findAll)
    .put(userController.update)
router.route('/gigs/:id')
    .post(gigController.create)
    .get(gigController.findById)
    .put(userController.update)

module.exports = router;