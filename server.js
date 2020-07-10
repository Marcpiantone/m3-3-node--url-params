"use strict";

// import the needed node_modules.
const express = require("express");

const morgan = require("morgan");

const { top50 } = require("./data/top50");

const { books } = require("./data/books");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here

// New endpoint top50
app.get("/top50", (req, res) => {
  res.status(200);
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50,
  });
});

// New endpoint top50/popular-artist --TRY
// app.get("/top50/popular-artist", (req, res) => {
//   res.status(200);
//   res.render("pages/popularArtist", {
//     title: "Most Popular Artist",
//     top50,
//   });
// });

// New endpoint top50/song/#

app.get("/top50/song/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(typeof id);
  if (top50[id - 1]) {
    res.status(200);
    res.render("pages/songPage", {
      title: `Song #${id}`,
      top50,
      id,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

// New endpoints Books
app.get("/books", (req, res) => {
  res.status(200);
  res.render("pages/books", {
    title: "All my books",
    books,
  });
});

app.get("/books/book/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);

  const getBookById = () => {
    const book = books.find((book) => {
      return book.id === id;
    });
    return book;
  };

  const book = getBookById();
  console.log(book);
  if (book !== undefined) {
    res.status(200).render("pages/bookPage", {
      title: "My books in details",
      book,
      books,
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
});

app.get("/books/type/:genre", (req, res) => {
  const genre = req.params.genre;

  const getBooksByGenre = () => {
    const bookGenre = books.filter((book) => {
      return book.type === genre;
    });
    return bookGenre;
  };

  const myGenre = getBooksByGenre();
  console.log(myGenre);
  res.status(200).render("pages/fictionPage", {
    title: `My ${genre} books`,
    myGenre,
    books,
  });
});

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
