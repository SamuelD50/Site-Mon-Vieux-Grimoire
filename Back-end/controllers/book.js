const bookThing = require('../models/book-Thing')

exports.getBooks = 

exports.getBook

exports.getBestRatedBooks

exports.addBook

exports.rateBook

exports.updateBook

exports.deleteBook


/* (req, res, next) => {
    const thing = new bookThing({
        userId: req.body.userId,
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        genre: req.body.genre,
        ratings: [
            {
                userId: req.body.ratings.userId,
                grade: req.body.ratings.grade,
            }
        ],
        averageRating: req.body.averageRating,
    });
    thing.save()
        .then(() => {res.status(201).json({
        message: 'Livre enregistré !'
        })
})
}) */