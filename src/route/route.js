const express = require('express');
const router = express.Router();
const {registrationOfUser,loginUser} = require('../controller/customerRegistrationContoller');
const {createOrder} = require('../controller/orderController')
const {authentication} = require('../middleware/auth');
const {customerValidations,userLoginValidations,orderValidations} = require('../middleware/validation')

// API's
router.post('/userRegistration',customerValidations,registrationOfUser);
router.post('/loginUser',userLoginValidations,loginUser);
router.post('/createOrder/:customerId',authentication,orderValidations,createOrder)

module.exports= router;
