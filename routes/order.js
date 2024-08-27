const express = require('express');
const router = express.Router();
const {handleOrder, handleOrderValidation} = require('../controllers/order');

router.post('/',handleOrder)
router.post('/validate',handleOrderValidation)

module.exports = router;