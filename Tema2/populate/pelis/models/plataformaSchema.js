/**
 * Aqui esta el esquema de las plataformas de las películas, separado en un
 * archivo a parte para estar más ordenado
 */
const mongoose = require("mongoose");

let plataformaSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  anyo: Number
});

module.exports = plataformaSchema;
