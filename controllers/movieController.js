const Movie = require("../models/Movie");

const movieController = {
  getAllMovies: (req, res) => {
    Movie.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  getMovieById: (req, res) => {
    const { id } = req.params;
    Movie.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Movie not found" });
      res.json(results[0]);
    });
  },

  createMovie: (req, res) => {
    const { title, description, genre_id, release_year } = req.body; // Memasukkan description
    Movie.create(title, description, genre_id, release_year, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Movie created successfully!" });
    });
  },

  updateMovie: (req, res) => {
    const { id } = req.params;
    const { title, description, genre_id, release_year } = req.body; // Memasukkan description
    Movie.update(id, title, description, genre_id, release_year, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Movie updated successfully!" });
    });
  },

  deleteMovie: (req, res) => {
    const { id } = req.params;
    Movie.delete(id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Movie deleted successfully!" });
    });
  },
};

module.exports = movieController;
