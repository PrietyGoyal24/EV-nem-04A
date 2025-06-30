const express = require('express');
const router = express.Router();
const {
  createBook,
  getBooks,
  getBooksByGenre,
  deleteBook,
  booksPerGenre
} = require('../controllers/bookController');

router.post('/', createBook);
router.get('/', getBooks);
router.get('/genre/:genre', getBooksByGenre);
router.delete('/:id', deleteBook);
router.get('/stats/books-per-genre', booksPerGenre);

module.exports = router;