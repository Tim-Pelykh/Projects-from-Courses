
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 12;

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/securityDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {

    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const registeredUser = new User({
            email: req.body.username,
            password: hash                             
        });

        registeredUser.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("User was successfully registered.");
                res.render("secrets");
            }
        });
    });


});

app.post("/login", (req, res) => {
    const enteredEmail = req.body.username;
    const enteredPassword = req.body.password;                         

    User.findOne({ email: enteredEmail }, (err, foundUser) => {
        if (!err) {
            if (foundUser) {
                bcrypt.compare(enteredPassword, foundUser.password, (err, result) => {
                    if (result === true) {
                        console.log("Successfully logged in!");
                        res.render("secrets");
                    } else {
                        console.log("Wrong password.");
                        res.redirect("/");
                    }
                });
            } else {
                console.log("There is no such user.");
                res.redirect("/");
            }
        } else {
            console.log(err);
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server has been started on 3000");
});