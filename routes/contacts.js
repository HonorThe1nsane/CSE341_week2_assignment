
const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

module.exports = (mongoose) => {
    const Person = mongoose.model(
        'person',
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                email: String,
                favoriteColor: String,
                birthday: String,
            },
            { timestamps: true }
        )
    );
    return Person;
};

// GET /feed/posts

router.get('/', contactsController.getData);

router.get('/:id', contactsController.getSingleData);

router.post('/', contactsController.createNewContact);

router.put('/:id', contactsController.updatePerson);

router.delete('/:id', contactsController.deletePerson);
// localhost:8080
module.exports = router;

