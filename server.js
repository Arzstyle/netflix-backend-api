const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./db/connection");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const genreRoutes = require("./routes/genresRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/movie", movieRoutes);
app.use("/genres", genreRoutes);
app.use("/watchlist", watchlistRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
