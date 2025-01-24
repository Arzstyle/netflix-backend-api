const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "Access denied, token missing!" });
  }

  const token = authHeader.split(" ")[1]; // Ambil token setelah "Bearer"
  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifikasi token
    req.user = decoded; // Simpan data pengguna ke req.user
    next(); // Lanjutkan ke controller berikutnya
  } catch (err) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = authMiddleware;
