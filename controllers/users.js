const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
     //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users[0]);
    });
};


// Creting new contact
const createContact = async (req, res) => {
     //#swagger.tags=['Users']
    try {
        const newContact = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address
        };

        if (!newContact.name || !newContact.email || !newContact.phone || !newContact.address) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const result = await mongodb.getDatabase().db().collection('contacts').insertOne(newContact);
        res.status(201).json({ contactId: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating the contact.' });
    }
};


// Updating a contact 
const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id);
        
        // Crear un objeto de actualización solo con los campos presentes
        const updatedContact = {};
        if (req.body.name) updatedContact.name = req.body.name;
        if (req.body.email) updatedContact.email = req.body.email;
        if (req.body.phone) updatedContact.phone = req.body.phone;
        if (req.body.address) updatedContact.address = req.body.address;

        // Verificar si al menos un campo fue enviado para actualizar
        if (Object.keys(updatedContact).length === 0) {
            return res.status(400).json({ message: 'At least one field is required for update.' });
        }

        const result = await mongodb.getDatabase().db().collection('contacts').updateOne(
            { _id: contactId },
            { $set: updatedContact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({ message: 'Contact updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating the contact.' });
    }
};


// Delting contact
const deleteContact = async (req, res) => {
     //#swagger.tags=['Users']
    try {
        const contactId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        res.status(200).json({ message: 'Contact deleted successfully.' });
    } catch (err) {
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
