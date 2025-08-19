const fs = require("fs");
const jsonChecker = require("./jsonChecker");

const addMovie = (req, res) => {
    const { movie_name, info, rating } = req.body;

    // Validations
    try {
        if (!movie_name) throw "Movie name is required";
        if (!info) throw "Movie information is required";
        if (!rating) throw "Movie rating is required";
        if (isNaN(rating)) throw "Rating must be a numbebr";
        if (rating < 0 || rating > 10) throw "Rating must be between 1-10";
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e,
        });

        return;
    }

    // Get all movies

    let moviesData = [];

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

        moviesData = JSON.parse(data);

        moviesData.push({
            id: parseFloat(
                Math.random().toString().replace("0.", "").substring(0, 5)
            ),
            movie_name,
            info,
            rating,
        });

        fs.writeFile(
            "./movies.json",
            JSON.stringify(moviesData),
            (err, data) => {
                if (err) {
                    res.status(400).json({
                        status: "Failed",
                        message: "Tidak bisa menulis file",
                    });

                    return;
                }
            }
        );

        res.status(200).json({
            status: "Success",
            message: "Movie added Successfully",
        });
    });
};

module.exports = addMovie;
