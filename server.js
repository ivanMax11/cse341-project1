const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

// Middleware
app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Data base is running and node is in port ${port}`)});
    }
})

