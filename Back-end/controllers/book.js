const Book = require('../models/bookSchema')
const fs = require('fs')

/* This file implements various features related to book management */

/* GET '/api/books' */
exports.getBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

/* GET '/api/books/:id' */
exports.getBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }))
}

/* GET '/api/books/bestrating' */
exports.getBestRatedBooks = (req, res, next) => {
    Book.find().sort({averageRating: -1}).limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }))
}

/* POST '/api/books' */
exports.addBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const newWebpFilename = `${req.file.filename.split('.')[0]}.webp`;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${newWebpFilename}`
    });

    book.save()
    .then(() => { res.status(201).json({ message: 'Livre enregistré !'})})
    .catch(error => { res.status(400).json({ error })})
};

/* POST '/api/books/:id/rating' */
exports.rateBook = (req, res, next) => {
    const { userId, rating } = req.body;

    if (req.params.id === undefined) {
        return res.status(400).json({ message: "Ce livre est introuvable!"})
    }

    if (rating < 0 || rating > 5) {
        return res.status(400).json({ error: "La note doit être comprise entre 0 et 5" })
    }

    Book.findOne({ _id: req.params.id })
        .then(book => {
            const userRating = book.ratings.find(rating => rating.userId === userId)

            if (userRating) {
                return res.status(400).json({ message: "Vous avez déjà noté ce livre!"})
            }

            book.ratings.push({ userId, grade: rating })
            const additionRatings = book.ratings.reduce((acc, rating) => acc + rating.grade, 0)
            const averageRating = Math.round(additionRatings / book.ratings.length)
            book.averageRating = averageRating;

            book.save()
                .then(giveRating => {
                    res.status(200).json(giveRating)
                })
                .catch(error => {
                    res.status(500).json({ error })
                })
        })
        .catch(error => {
            res.status(500).json({ error })
        })
}

/* PUT '/api/books/:id' */
exports.updateBook = (req, res, next) => {
    const newWebpFilename = req.file ? 
        `${req.file.filename.split('.')[0]}.webp`
        : req.body.imageUrl;
        
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${newWebpFilename}`
    } : {
        ...req.body
    };

    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message: '403: unauthorized request' });
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({ message: 'Livre modifié !'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

/* DELETE '/api/books/:id' */
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé! '})
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({ message: 'Livre supprimé !'})})
                        .catch(error => res.status(401).json({ error }))
                })
            }
        })
        .catch( error => {
            res.status(500).json({ error })
        })
}