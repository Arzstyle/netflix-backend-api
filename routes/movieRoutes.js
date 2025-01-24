const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// CRUD Movies
router.get("/getAll/", movieController.getAllMovies);          
router.get("/getMovieById/:id", movieController.getMovieById);
        
router.post("/create/", movieController.createMovie);     
     
router.put("/update/:id", movieController.updateMovie);  
      
router.delete("/delete/:id", movieController.deleteMovie);      

module.exports = router;
