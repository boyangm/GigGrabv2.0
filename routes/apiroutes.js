var express = require('express')
var router = express.Router()
const userController = require('../controller/userController');
const gigController = require('../controller/gigcontroller');

// list of api Routes
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
    .delete(userController.update)

 router.route('/users/giftgigs/:id')
    .put(userController.updateGigsHosted)

router.post('/login',userController.login)

router.route('/gigs')
    .post(gigController.create)
    .get(gigController.findAll)
    .put(userController.update)
    
    

router.route('/gigs/:id')
    .post(gigController.create)
    .get(gigController.findById)
    .put(gigController.update)
    .delete(gigController.remove)

module.exports = router;