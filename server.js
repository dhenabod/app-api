const express = require("express");
const bcrypt = require("bcrypt-nodejs"); // password encryption
const cors = require("cors");
const knex = require("knex");
const { response } = require("express");
const app = express(); // create app by running express
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

app.get("/", (req, res) => {
    // res.send(database.users);
});

// sign in
app.post("/signin", (req, res) => {
    //this is called dependency injection
    signIn.handleSignIn(req, res, db, bcrypt);
});

// register
app.post("/register", (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
});

// profile
app.get("/profile/:id", (req, res) => {
    profile.handleProfile(req, res, db);
});

// image
app.put("/image", (req, res) => {
    image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
    image.handleApiCall(req, res);
});

// 2nd param/fn will run after the listen happens
app.listen(3000, () => {
    console.log(`APP IS RUNNING AT 3000`);
});

// // bcrypt will hass the password
// bcrypt.hash(password, null, null, function (err, hash) {
//     console.log(hash);
// });

// // app.use(express.urlencoded({ extended: false }));
// // // parse json response
// // app.use(express.json());

// NOTES-----------------------------------------------------------------------------------------------------------
// npm install express (server)
// npm install nodemon --save-dev (dev tool)
// npm install bcrypt-nodejs (password encryption)
// npm install cors = https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// npm install knex --save (database connection), https://knexjs.org/
// npm install pg(for postgres) this should be install after knex
// postgreslq cheatsheet = https://tomcam.github.io/postgres/

//C:\Users\SSA\Desktop\Prog\WebDev Bootcamp\25 - Final Project - Backend\smart-brain-api
