const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const app = express();
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        user: "postgres",
        password: "test",
        database: "smart-brain",
    },
});

app.use(express.json());
app.use(cors());

app.post("/signin", (req, res) => {
    signIn.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
    profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
    image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res);
});

app.listen(3000, () => {
    console.log(`APP IS RUNNING AT 3000`);
});
