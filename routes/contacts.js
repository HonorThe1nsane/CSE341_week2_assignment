
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');


// GET /feed/posts

router.get('/', contactsController.getData);

router.get('/:id', contactsController.getSingleData);


// localhost:8080
module.exports = router;

