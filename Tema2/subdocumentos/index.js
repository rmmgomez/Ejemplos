const mongoose = require("mongoose");
const express = require("express");

const peliculas = require(__dirname + "/routes/peliculas");

mongoose.connect("mongodb://localhost:27017/pelisSUB", {useNewURLParser: true});

let app = express();
app.use(express.json());
app.use("/peliculas", peliculas);

app.listen(8080);
