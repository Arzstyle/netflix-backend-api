const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/connection");

const userController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully!" });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM Users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: "User not found" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    });
  },

  getAllUsers: (req, res) => {
    const sql = "SELECT * FROM Users";
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  findByEmail: (req, res) => {
    const { email } = req.params;
    const sql = "SELECT * FROM Users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });
      res.status(200).json(results[0]);
    });
  },

  getUserById: (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Users WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });
      res.status(200).json(results[0]);
    });
  },
  updateUser: (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = "UPDATE Users SET name = ?, email = ? WHERE id = ?";
    db.query(sql, [name, email, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "User updated successfully!" });
    });
  },

  deleteUser: (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Users WHERE id = ?";
    db.query(sql, [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "User deleted successfully!" });
    });
  },
};

module.exports = userController;
