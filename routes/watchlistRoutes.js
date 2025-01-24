const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getAllByUserId/:userId", authMiddleware, watchlistController.getAllByUserId);
router.get("/getAllWatchlist", authMiddleware, watchlistController.getAllWatchlist); 

router.post("/addWatchlist", authMiddleware, watchlistController.addMovieToWatchlist); 

router.delete("/removeMovieFromWatchlist/:userId/:movieId", authMiddleware, watchlistController.removeMovieFromWatchlist); 

module.exports = router;
