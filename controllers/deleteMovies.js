const fs = require("fs");
const jsonChecker = require("./jsonChecker");

const deleteMovie = (req, res) => {
    const { movie_id } = req.params;

    try {
        if (!movie_id) throw "Movie id is missing";
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e,
        });

        return;
    }

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
                message: "Movie not found. Please check movie id",
            });

            return;
        }

        const all_movie_except_the_provided_id_to_delete = JSON.parse(
            data
        ).filter(
            (movie) => movie.id && movie.id.toString() !== movie_id.toString()
        );

        fs.writeFile(
            "./movies.json",
            JSON.stringify(all_movie_except_the_provided_id_to_delete),
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
            message: "Movie removed successfully",
        });
    });
};

module.exports = deleteMovie;
