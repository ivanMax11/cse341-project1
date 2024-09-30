const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

// Route to create a new contact
router.post('/', usersController.createContact);

// Route to update a contact
router.put('/:id', usersController.updateContact);

// Route to delete a contact
router.delete('/:id', usersController.deleteContact);

module.exports = router;