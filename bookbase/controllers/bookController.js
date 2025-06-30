const Book = require('../models/Book');

// POST /api/books
exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

// GET /api/books
exports.getBooks = async (req, res) => {
  const books = await Book.find().populate('author');
  res.json(books);
};

// GET /api/books/genre/:genre
exports.getBooksByGenre = async (req, res) => {
  const books = await Book.find({ genre: req.params.genre });
  res.json(books);
};

// DELETE /api/books/:id
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
};

// GET /api/books/stats/books-per-genre
exports.booksPerGenre = async (req, res) => {
  const result = await Book.aggregate([
    {
      $group: {
        _id: '$genre',
        total: { $sum: 1 }
      }
    },
    {
      $project: {
        genre: '$_id',
        total: 1,
        _id: 0
      }
    }
  ]);
  res.json(result);
};