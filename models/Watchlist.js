const db = require("../db/connection");

const Watchlist = {
  getAllByUserId: (userId, callback) => {
    const sql = `
      SELECT w.id, w.movie_id, m.title, w.added_at 
      FROM Watchlist w 
      JOIN Movies m ON w.movie_id = m.id 
      WHERE w.user_id = ?`;
    db.query(sql, [userId], callback);
  },

  getAllWatchlist: (callback) => {
    const sql = "SELECT * FROM Watchlist";
    db.query(sql, callback);
  },

  addMovieToWatchlist: (userId, movieId, callback) => {
    const checkUserQuery = "SELECT id FROM users WHERE id = ?";
    db.query(checkUserQuery, [userId], (err, userResults) => {
      if (err) return callback(err);
      if (userResults.length === 0) return callback(new Error("User not found"));

      const checkMovieQuery = "SELECT id FROM movies WHERE id = ?";
      db.query(checkMovieQuery, [movieId], (err, movieResults) => {
        if (err) return callback(err);
        if (movieResults.length === 0) return callback(new Error("Movie not found"));

        const checkWatchlistQuery = "SELECT id FROM watchlist WHERE user_id = ? AND movie_id = ?";
        db.query(checkWatchlistQuery, [userId, movieId], (err, watchlistResults) => {
          if (err) return callback(err);
          if (watchlistResults.length > 0) return callback(new Error("Movie already exists in watchlist"));

          const insertWatchlistQuery = "INSERT INTO watchlist (user_id, movie_id, added_at) VALUES (?, ?, CURRENT_TIMESTAMP)";
          db.query(insertWatchlistQuery, [userId, movieId], callback);
        });
      });
    });
  },

  removeMovieFromWatchlist: (userId, movieId, callback) => {
    const sql = "DELETE FROM Watchlist WHERE user_id = ? AND movie_id = ?";
    db.query(sql, [userId, movieId], callback);
  },
};

module.exports = Watchlist;
