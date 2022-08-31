const express = require("express");
const morgan = require("morgan");
const booksData = require("./booksData");

const app = express();

/** PIPELINE STARTS HERE **/
// App-level middleware
app.use(morgan("common"));

// Routes
app.get("/books", (req, res, next) => {
  const { search } = req.query;
  let results = [...booksData];

  if (search) {
    results = results.filter(book => 
      book.title.match(new RegExp(search, "i")))
  }

  res.json({ data: results });
});

app.get("/books/:bookId", (req, res, next) => {
  const { bookId } = req.params;
  const book = booksData.find(book => book.id === bookId);

  if (!book) {
    return next({
      status: 404,
      message: "Book id not found"
    });
  }

  res.json({ data: book });
});



// Not Found handler
app.use(function notFoundHandler(req, res, next) {
  next(`Route not found: ${req.originalUrl}`);
});

// Error handler
app.use(function errorHandler(err, req, res, next) {
  const { status, message } = err;
  console.error(err);
  // logfile writing

  res.status(status).json({ error: message });
});
/** PIPELINE ENDS HERE **/

module.exports = app;
