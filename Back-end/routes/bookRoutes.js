const express = require('express')
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const bookCtrl = require('../controllers/book')

router.get('/', bookCtrl.getBooks)
router.get('/:id', bookCtrl.getBook)
/* router.get('/bestrating', bookCtrl.getBestRatedBooks) */

router.post('/', auth, multer, bookCtrl.addBook)
/* router.post('/:id/rating', auth, bookCtrl.rateBook) */

router.put('/:id', auth, multer, bookCtrl.updateBook)

router.delete('/:id', auth, bookCtrl.deleteBook)

module.exports = router;
