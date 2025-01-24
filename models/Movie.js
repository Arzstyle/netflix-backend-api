const db = require("../db/connection");

const Movie = {
  getAll: (callback) => {
    const sql = "SELECT * FROM movies"; // Nama tabel diubah menjadi huruf kecil
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM movies WHERE id = ?"; // Nama tabel diubah menjadi huruf kecil
    db.query(sql, [id], callback);
  },

  create: (title, description, genreId, releaseYear, callback) => {
    const sql = `
      INSERT INTO movies (title, description, genre_id, release_year)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [title, description || null, genreId, releaseYear || null], callback); // Menggunakan NULL jika description/release_year kosong
  },

  update: (id, title, description, genreId, releaseYear, callback) => {
    const sql = `
      UPDATE movies 
      SET title = ?, description = ?, genre_id = ?, release_year = ?
      WHERE id = ?
    `;
    db.query(sql, [title, description || null, genreId, releaseYear || null, id], callback); // Menggunakan NULL jika description/release_year kosong
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM movies WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Movie;
