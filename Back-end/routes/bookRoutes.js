const express = require('express')
const router = express.Router();

const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getBooks)
router.get('/:id', bookCtrl.getBook)
router.get('/bestrating', bookCtrl.getBestRatedBooks)



router.post('/', bookCtrl.addBook)
router.post('/:id/rating', bookCtrl.rateBook)

router.put('/:id', bookCtrl.updateBook)

router.delete('/:id', bookCtrl.deleteBook)

module.exports = router;
