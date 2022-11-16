const mongoose = require("mongoose");
const express = require("express");

const peliculas = require(__dirname + "/routes/peliculas");
const directores = require(__dirname + "/routes/directores");

mongoose.connect("mongodb://localhost:27017/pelis", {
  useNewURLParser: true,
  useUnifiedTopology: true
});

let app = express();
app.use(express.json());
app.use("/peliculas", peliculas);
app.use("/directores", directores);

app.listen(8080);
