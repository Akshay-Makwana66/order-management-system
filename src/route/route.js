const express = require('express');
const router = express.Router();
const {registrationOfUser,loginUser} = require('../controller/customerRegistrationContoller');
const {createOrder} = require('../controller/orderController')
const {authentication} = require('../middleware/auth');
const {customerValidations,orderValidations} = require('../middleware/validation')
router.post('/userRegistration',customerValidations,registrationOfUser);
router.post('/loginUser',loginUser);
router.post('/createOrder/:customerId',authentication,orderValidations,createOrder)

module.exports= router;
