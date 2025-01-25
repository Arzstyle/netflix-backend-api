const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getAllByUserId/:userId", authMiddleware, watchlistController.getAllByUserId);

router.post("/addWatchlist", authMiddleware, watchlistController.addMovieToWatchlist); 

router.put("/updateWatchlist/:userId/:movieId", authMiddleware, watchlistController.updateWatchlist);

router.delete("/removeMovie/:userId/:movieId", authMiddleware, watchlistController.removeMovieFromWatchlist); 

module.exports = router;
