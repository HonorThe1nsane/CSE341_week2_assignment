
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contacts');


// GET /feed/posts

router.get('/', contactController.getData);

router.get('/:id', contactController.getSingleData);

// localhost:8080
module.exports = router;

