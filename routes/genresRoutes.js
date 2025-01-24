const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genresController");


router.get("/getAllGenres", genreController.getAllGenres);           
router.get("/getById/:id", genreController.getGenreById); 

router.post("/createGenre/", genreController.createGenre);    

router.put("/updateGenre/:id", genreController.updateGenre);  

router.delete("/deleteGenre/:id", genreController.deleteGenre);     

module.exports = router;
