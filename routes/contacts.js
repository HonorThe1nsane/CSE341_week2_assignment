
const router = require('express').Router();
const contactController = require('../controllers/contacts');


// GET /feed/posts
//router.get('/', contactController.getData);

router.get('/', contactController.getSingleData);

// localhost:8080
module.exports = router;

