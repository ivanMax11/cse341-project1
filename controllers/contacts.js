const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Obtener todos los contactos
const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        // Obtiene la instancia de la base de datos
        const db = mongodb.getDatabase();
        if (!db) {
            return res.status(500).json({ message: 'Database not initialized!' });
        }

        // Obtiene los contactos de la colección
        const contacts = await db.collection('contacts').find().toArray();

        // Configura la cabecera y devuelve los contactos
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contacts);
    } catch (err) {
        console.error('Error retrieving contacts:', err); // Para depuración
        res.status(500).json({ message: 'Error retrieving contacts.' });
    }
};

// Obtener un contacto por ID
const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        if (!db) {
            return res.status(500).json({ message: 'Database not initialized!' });
        }

        const contact = await db.collection('contacts').findOne({ _id: contactId });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.setHeader('Content-type', 'application/json');
        res.status(200).json(contact);
    } catch (err) {
        console.error('Error retrieving the contact:', err); // Para depuración
        res.status(500).json({ message: 'Error retrieving the contact.' });
    }
};

// Crear nuevo contacto
const createContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ message: 'All fields are required: firstName, lastName, email, favoriteColor, and birthday.' });
        }

        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday: new Date(birthday) // Almacenar la fecha de cumpleaños como un objeto Date
        };

        const db = mongodb.getDatabase();
        if (!db) {
            return res.status(500).json({ message: 'Database not initialized!' });
        }

        const result = await db.collection('contacts').insertOne(newContact);
        res.status(201).json({ contactId: result.insertedId });
    } catch (err) {
        console.error('Error creating the contact:', err); // Para depuración
        res.status(500).json({ message: 'Error creating the contact.' });
    }
};

// Actualizar un contacto
const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        // Crear un objeto de actualización con solo los campos enviados
        const updatedContact = {};
        if (firstName) updatedContact.firstName = firstName;
        if (lastName) updatedContact.lastName = lastName;
        if (email) updatedContact.email = email;
        if (favoriteColor) updatedContact.favoriteColor = favoriteColor;
        if (birthday) updatedContact.birthday = new Date(birthday);

        if (Object.keys(updatedContact).length === 0) {
            return res.status(400).json({ message: 'At least one field is required for update.' });
        }

        const db = mongodb.getDatabase();
        if (!db) {
            return res.status(500).json({ message: 'Database not initialized!' });
        }

        const result = await db.collection('contacts').updateOne(
            { _id: contactId },
            { $set: updatedContact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({ message: 'Contact updated successfully.' });
    } catch (err) {
        console.error('Error updating the contact:', err); // Para depuración
        res.status(500).json({ message: 'Error updating the contact.' });
    }
};

// Eliminar un contacto
const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
        const contactId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase();
        if (!db) {
            return res.status(500).json({ message: 'Database not initialized!' });
        }

        const result = await db.collection('contacts').deleteOne({ _id: contactId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({ message: 'Contact deleted successfully.' });
    } catch (err) {
        console.error('Error deleting the contact:', err); // Para depuración
        res.status(500).json({ message: 'Error deleting the contact.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
