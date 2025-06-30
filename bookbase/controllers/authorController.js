const Author = require('../models/Author');
const Book = require('../models/Book');

// POST /api/authors
exports.createAuthor = async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.status(201).json(author);
};

// GET /api/authors
exports.getAuthors = async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
};

// GET /api/authors/:id
exports.getAuthorById = async (req, res) => {
  const author = await Author.findById(req.params.id);
  const books = await Book.find({ author: req.params.id });
  res.json({ author, books });
};

// DELETE /api/authors/:id
exports.deleteAuthor = async (req, res) => {
  await Book.deleteMany({ author: req.params.id });
  await Author.findByIdAndDelete(req.params.id);
  res.json({ message: 'Author and books deleted' });
};

// GET /api/authors/stats/top-authors
exports.topAuthors = async (req, res) => {
  const result = await Book.aggregate([
    { $group: { _id: '$author', bookCount: { $sum: 1 } } },
    { $sort: { bookCount: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: 'authors',
        localField: '_id',
        foreignField: '_id',
        as: 'authorInfo'
      }
    },
    { $unwind: '$authorInfo' },
    {
      $project: {
        name: '$authorInfo.name',
        bookCount: 1
      }
    }
  ]);
  res.json(result);
};