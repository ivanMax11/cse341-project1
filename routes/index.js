const router = require('express').Router();

// Rutas para Swagger
router.use('/', require('./swagger'));

// Ruta principal de prueba
router.get('/', (req, res) => {
    res.send('Hello world!');
});

// Rutas para manejar los contactos (antes era /users)
router.use('/contacts', require('./contacts'));

module.exports = router;
