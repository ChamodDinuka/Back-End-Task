const express = require('express');
const {currencyValue } = require('../controllers/currency_controller');
const router = express.Router();

router.route('/convert').post(currencyValue);


module.exports = router;