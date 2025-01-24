const db = require("../db/connection");
const { get } = require("../routes/userRoutes");

const User = {
  
  create: (name, email, hashedPassword, callback) => {
    const sql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], callback);
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM Users WHERE email = ?";
    db.query(sql, [email], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM Users"; // Query untuk mengambil semua pengguna.
    db.query(sql, callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM Users WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = User;
