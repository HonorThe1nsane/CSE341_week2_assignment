const express = require('express');

const contactController = require('../controllers/contacts');

const router = express.Router();

// GET /feed/posts

router.get('/', contactController.getSingleData);
router.get('/', contactController.getData );
// localhost:8080/professional/
module.exports = router;

