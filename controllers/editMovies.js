const fs = require("fs");
const jsonChecker = require("./jsonChecker");

const editMovie = (req, res) => {
    const { movie_id, movie_name, info, rating } = req.body;

    try {
        if (!movie_id) throw "Movie id is required";
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e,
        });

        return;
    }

    // Trying to delete movies

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

        const checkIfExists = JSON.parse(data).filter(
            (item) => item.id == movie_id
        );

        if (!checkIfExists || checkIfExists.length < 1) {
            res.status(400).json({
                status: "Failed",
                message: "Movie not found! Please chec movie id",
            });

            return;
        }

        const modifiedMovieData = JSON.parse(data).map((item) => {
            if (item.id == movie_id) {
                return {
                    id: item.id,
                    movie_name: movie_name ? movie_name : item.movie_name,
                    info: info ? info : item.info,
                    rating: rating ? rating : item.rating,
                };
            } else {
                return item;
            }
        });

        fs.writeFile(
            "./movies.json",
            JSON.stringify(modifiedMovieData),
            (err, data) => {
                if (err) {
                    res.status(400).json({
                        status: "Failed",
                        message: "Tidak bisa mengakses file",
                    });

                    return;
                }
            }
        );

        res.status(200).json({
            status: "Success",
            message: "Movie update successfully",
        });
    });
};

module.exports = editMovie;
