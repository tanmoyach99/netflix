const express = require("express");
const movieRouter = express.Router();
const verify = require("../verifyToken.");
const Movie = require("../modals/Movies");

//Create Movie

movieRouter.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);

    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you aren't allowed");
  }
});

//update movie

movieRouter.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you aren't allowed");
  }
});

//delete movie

movieRouter.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("movie is deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you aren't allowed");
  }
});

//get movie
movieRouter.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

//random movie

movieRouter.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let movie;

  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

movieRouter.get("/", verify, async (req, res) => {
  try {
    const movie = await Movie.find();

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = movieRouter;
