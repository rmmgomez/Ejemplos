const mongoose = require("mongoose");

let actorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3
  },
  edad: Number
});

let peliculaSchema = new mongoose.Schema({
  titol: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  duracio: {
    type: Number,
    required: true,
    min: 0
  },
  genere: {
    type: String,
    required: true,
    enum: ["comedia", "terror", "drama", "aventures", "altres"]
  },
  valoracio: {
    type: Number,
    min: 0,
    max: 5
  },
  actor: [actorSchema]
});
let Pelicula = mongoose.model("pelicula", peliculaSchema);

module.exports = Pelicula;
