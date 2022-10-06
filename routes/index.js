const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


router.use('/contacts', require('./contacts'));
router.use('/', require('./swagger'));

module.exports = router;