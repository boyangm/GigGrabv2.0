var express = require('express')
var router = express.Router()
const userController = require('../controller/userController');
const gigController = require('../controller/gigcontroller');
router.route('/users')
    .post(userController.create)
    .get(userController.findAll)
    .put(userController.update)

router.route('/users/:id')
    .post(userController.create)
    .get(userController.findById)
    .put(userController.update)

 router.route('/users/gigs/:id')
    .put(userController.updateGigs)

router.post('/login',userController.login)

router.route('/gigs')
    .post(gigController.create)
    .get(gigController.findAll)
    .put(userController.update)

router.route('/gigs/:id')
    .post(gigController.create)
    .get(gigController.findById)
    .put(gigController.update)

module.exports = router;