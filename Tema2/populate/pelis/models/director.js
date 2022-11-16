const mongoose = require("mongoose");

let directorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3
  },
  anyo: Number
});

let Director = mongoose.model("director", directorSchema);

module.exports = Director;
