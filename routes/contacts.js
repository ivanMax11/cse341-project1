const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// Obtener todos los contactos
router.get('/', contactsController.getAll);

// Obtener un contacto por ID
router.get('/:id', contactsController.getSingle);

// Crear un nuevo contacto
router.post('/', contactsController.createContact);

// Actualizar un contacto por ID
router.put('/:id', contactsController.updateContact);

// Eliminar un contacto por ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
