const express = require('express');
const mongoose = require('mongoose');

const routesForUser = require('./routes/user-routes')
const routesForBook = require('./routes/book-routes')

mongoose.connect('mongodb+srv://SamuelDuflos50:Cherbourg50+@cluster0.28mbnyk.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(() => console.log('Connexion à MongoDB échouée'))

const app = express();

/* Accèder au corps de la requête */
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

/* app.get('/api/books', (req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !"})
    next();
}) */

/* app.post('/api/books', (req, res, next) => {
    delete req.body._id;
    const thing = new bookThing({
        ...req.body
    })
    thing.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré !'}))
        .catch(error => res.status(400).json({ error }))
})

app.use('/api/books', (req, res, next) => {
    bookThing.find()
        .then(bookThings => res.status(200).json(bookThings))
        .catch(error => res.status(400).json({ error }))
}) */



app.use('/api/books', routesForBook);

app.use('/api/auth', routesForUser);

module.exports = app;