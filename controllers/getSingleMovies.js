const fs = require("fs");
const jsonChecker = require("./jsonChecker");

const getSingleMovie = (req, res) => {
    const { movie_id } = req.params;

    try {
        if (!movie_id) throw "Movies id is missing";
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e,
        });

        return;
    }

    let allMovies = [];
    let singleMovie = [];

    fs.readFile("./movies.json", "utf-8", (err, data) => {
        if (err) {
            res.status(400).json({
                status: "Failed",
                message: "Tidak bisa mengakses file",
            });

            return;
        }

        if (!jsonChecker(data)) {
            res.status(400).json({
                status: "Failed",
                message:
                    "JSON data in movies.json file is not formatted correctly. If you are unsure of what error that is, keep empty array in that file!",
            });

            return;
        }

        allMovies = JSON.parse(data);
        singleMovie = allMovies.filter(
            (movie) => movie.id && movie.id.toString() === movie_id.toString()
        );

        res.status(200).json({
            status: true,
            data: singleMovie,
        });
    });
};

module.exports = getSingleMovie;
