const Watchlist = require("../models/Watchlist");
const db = require("../db/connection");

const watchlistController = {
  getAllByUserId: (req, res) => {
    const userId = req.params.userId; 
    Watchlist.getAllByUserId(userId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results); 
    });
  },

  getAllWatchlist: (req, res) => {
    Watchlist.getAllWatchlist((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results); 
    });
  },

  addMovieToWatchlist:  (req, res) => {
    const { userId, movieId } = req.body;

  if (!userId || !movieId) {
    return res.status(400).json({ error: "User ID and Movie ID are required" });
  }

  const checkUserQuery = "SELECT id FROM users WHERE id = ?";
  db.query(checkUserQuery, [userId], (err, userResults) => {
    if (err) {
      return res.status(500).json({ error: "Database error when checking user" });
    }
    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const checkMovieQuery = "SELECT id FROM movies WHERE id = ?";
    db.query(checkMovieQuery, [movieId], (err, movieResults) => {
      if (err) {
        return res.status(500).json({ error: "Database error when checking movie" });
      }
      if (movieResults.length === 0) {
        return res.status(404).json({ error: "Movie not found" });
      }

      const checkWatchlistQuery = "SELECT id FROM watchlist WHERE user_id = ? AND movie_id = ?";
      db.query(checkWatchlistQuery, [userId, movieId], (err, watchlistResults) => {
        if (err) {
          return res.status(500).json({ error: "Database error when checking watchlist" });
        }
        if (watchlistResults.length > 0) {
          return res.status(409).json({ error: "Movie already exists in watchlist" });
        }

        const insertWatchlistQuery = "INSERT INTO watchlist (user_id, movie_id, added_at) VALUES (?, ?, CURRENT_TIMESTAMP)";
        db.query(insertWatchlistQuery, [userId, movieId], (err, insertResults) => {
          if (err) {
            return res.status(500).json({ error: "Database error when adding to watchlist" });
          }
          res.status(201).json({ message: "Movie added to watchlist successfully!" });
        });
      });
    });
  });
},
  

  removeMovieFromWatchlist: (req, res) => {
    const userId = req.params.userId; // Ambil userId dari parameter
    const movieId = req.params.movieId; // Ambil movieId dari parameter
    Watchlist.removeMovieFromWatchlist(userId, movieId, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Movie removed from watchlist successfully!" });
    });
  },
};

module.exports = watchlistController;
