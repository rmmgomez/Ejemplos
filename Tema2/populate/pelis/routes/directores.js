const express = require("express");

let Director = require(__dirname + "/../models/director.js");
let Pelicula = require(__dirname + "/../models/pelicula.js");
let router = express.Router();

//GET Todos los directores
router.get("/", (req, res) => {
  Director.find()
    .then((resultat) => {
      if (!resultat || resultat.length === 0)
        res.status(400).send({error: "No se han encontrado directores" });
      else res.status(200).send({resultat: resultat });
    })
    .catch((err) => {
      res.status(500).send({error: "No se han encontrado directores" });
    });
});

//POST
router.post("/", (req, res) => {
  let nuevoDirector = new Director({
    ...req.body
  });

  nuevoDirector.save().then((resultat) => {
      res.status(200).send({resultat: resultat });
    })
    .catch((error) => {
      res.status(400).send({ error: "Error añadiendo director: " + error.message });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  Pelicula.find({ director: req.params.id })
    .then((resultat) => {
      if (!resultat || resultat.length === 0) {
        Director.findByIdAndRemove(req.params.id)
          .then((resultat) => {
            if (!resultat) throw new Error();
            res.status(200).send({resultat: resultat });
          })
          .catch((error) => {
            res
              .status(400)
              .send({error: "Error eliminado director" });
          });
      } else
        res.status(400).send({
          ok: false,
          error:
            "No es pot eliminar el director perqè té pel·lícules associades"
        });
    })
    .catch((error) => {
      res.status(500).send({ ok: false, error: "Error eliminant director" });
    });
});

module.exports = router;
