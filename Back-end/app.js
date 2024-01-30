const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

/* In this file, we configure our Express application with middlewares to handle requests, manage user and book routes, serve static files, set up CORS and finnaly, connect our application to the MongoDB database */

const userRoutes = require('./routes/userRoutes')
const bookRoutes = require('./routes/bookRoutes')

mongoose.connect('mongodb+srv://SamuelDuflos50:Cherbourg50+@cluster0.28mbnyk.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(() => console.log('Connexion à MongoDB échouée'))

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;