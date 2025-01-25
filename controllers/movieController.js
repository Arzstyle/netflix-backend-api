const db = require("../db/connection");

const movieController = {
  getAllMovies: (req, res) => {
    const sql = "SELECT * FROM Movies";
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  getMovieById: (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Movies WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Movie not found" });
      res.json(results[0]);
    });
  },

  createMovie: (req, res) => {
    const { title, description, genre_id, release_year } = req.body; // Memasukkan description
    const sql = "INSERT INTO Movies (title, description, genre_id, release_year) VALUES (?, ?, ?, ?)";
    db.query(sql, [title, description, genre_id, release_year], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Movie created successfully!" });
    });
  },

  updateMovie: (req, res) => {
    const { id } = req.params;
    const { title, description, genre_id, release_year } = req.body; // Memasukkan description
    const sql = "UPDATE Movies SET title = ?, description = ?, genre_id = ?, release_year = ? WHERE id = ?";
    db.query(sql, [title, description, genre_id, release_year, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Movie updated successfully!" });
    });
  },

  deleteMovie: (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Movies WHERE id = ?";
    db.query(sql, [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Movie deleted successfully!" });
    });
  },
};

module.exports = movieController;
