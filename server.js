const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-controll-allow-Origin', '*');
    res.setHeader(
        'Access-control-Allow-Headers',
        'Origin, x-Requested-with, Content-Type, Accept, 2-key'
    );
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Middleware de rutas
app.use('/', require('./routes'));

// Inicialización de la base de datos
mongodb.initDb((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected, and server is running on port ${port}`);
        });
    }
});
