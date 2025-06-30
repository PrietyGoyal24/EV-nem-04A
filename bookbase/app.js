const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');
const logger = require('./middlewares/logger');

const app = express();

//  Middlewares
app.use(express.json());       
app.use(cors());         
app.use(morgan('dev'));        
app.use(logger);               

//  Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookbase')
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.log(' MongoDB connection error:', err));

//  All API routes first
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

//  Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));
