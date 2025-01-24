const db = require("../db/connection");

const genreController = {
  getAllGenres: (req, res) => {
    const sql = "SELECT * FROM Genres";
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getGenreById: (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Genres WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "Genre not found" });
      res.status(200).json(results[0]);
    });
  },

  createGenre: (req, res) => {
    const { name } = req.body;
    const sql = "INSERT INTO Genres (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Genre created", id: result.insertId });
    });
  },

  updateGenre: (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const sql = "UPDATE Genres SET name = ? WHERE id = ?";
    db.query(sql, [name, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Genre not found" });
      res.status(200).json({ message: "Genre updated" });
    });
  },

  deleteGenre: (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Genres WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Genre not found" });
      res.status(200).json({ message: "Genre deleted" });
    });
  },
};

module.exports = genreController;
