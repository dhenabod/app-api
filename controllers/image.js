const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: "789e4f35f3094442a2cc68b1c0b66d0e",
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.CELEBRITY_MODEL, req.body.input)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => {
            res.status(400).json("unable to work with the api");
        });
};

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db("users")
        .where("id", "=", id)
        .increment("entries", 1)
        .returning("entries")
        .then((entries) => {
            res.json(entries[0]);
        })
        .catch((err) => {
            res.status(400).json("unable to get entry count");
        });
};
module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall,
};
