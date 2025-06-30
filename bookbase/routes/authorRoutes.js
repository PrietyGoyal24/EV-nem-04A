const express = require('express');
const router = express.Router();
const {
  createAuthor,
  getAuthors,
  getAuthorById,
  deleteAuthor,
  topAuthors
} = require('../controllers/authorController');

router.post('/', createAuthor);
router.get('/', getAuthors);
router.get('/:id', getAuthorById);
router.delete('/:id', deleteAuthor);
router.get('/stats/top-authors', topAuthors);

module.exports = router;