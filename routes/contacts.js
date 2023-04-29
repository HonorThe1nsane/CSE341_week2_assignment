
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');


// GET /feed/posts

router.get('/', contactsController.getData);

// localhost:8080
module.exports = router;

