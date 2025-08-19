const fs = require("fs");
const jsonChecker = require("./jsonChecker");

const getMovies = (req, res) => {
    fs.readFile("./movies.json", "utf-8", (err, data) => {
        if (err) {
            res.status(400).json({
                status: "Failed",
                message: "Tidak bisa mengakses file",
            });

            return;
        }

        if (!jsonChecker) {
            res.status(400).json({
                status: "Failed",
                message:
                    "JSON data in movies.json file is not formatted correctly. If you are unsure of what error that is, keep empty array in that file!",
            });

            return;
        }

        res.status(200).json({
            status: "Success",
            data: JSON.parse(data),
        });
    });
};

module.exports = getMovies;
