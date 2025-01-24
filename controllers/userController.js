const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const db = require("../db/connection");

const userController = {

  register: async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(name, email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "User registered successfully!" });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, results) => {
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
    User.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results); 
    });
  },

  getUserById: (req, res) => {
    const { id } = req.params;
    User.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "User not found" });
      res.status(200).json(results[0]); 
    });
  },
};

module.exports = userController;
