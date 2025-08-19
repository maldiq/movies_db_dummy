const express = require("express");
const addMovie = require("./controllers/addMovies");
const getMovies = require("./controllers/getMovies");
const editMovie = require("./controllers/editMovies");
const deleteMovie = require("./controllers/deleteMovies");
const getSingleMovie = require("./controllers/getSingleMovies");
const mainPage = require("./controllers/mainpage");

const app = express();

app.use(express.json());

app.get("/", mainPage);

// API routes
app.post("/api/movies", addMovie);
app.get("/api/movies", getMovies);
app.patch("/api/movies", editMovie);
app.delete("/api/movies/:movie_id", deleteMovie);
app.get("/api/movies/:movie_id", getSingleMovie);

// Starting the server
app.listen(4000, () => {
    console.log("Koneksi ke server berbasil");
});
