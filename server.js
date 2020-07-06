"use strict";

// import the needed node_modules.
const express = require("express");

const morgan = require("morgan");

const { top50 } = require("./data/top50");

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
  const id = req.params.id;
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

// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
