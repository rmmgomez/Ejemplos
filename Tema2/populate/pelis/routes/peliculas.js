const express = require("express");

let Pelicula = require(__dirname + "/../models/pelicula.js");
let router = express.Router();

router.get("/", (req, res) => {
  Pelicula.find()
    .populate("director")
    .then((resultat) => {
      if (!resultat || resultat.length === 0)
        res
          .status(400)
          .send({error: "No se han encontrado peliculas" });
      else res.status(200).send({resultat: resultat });
    })
    .catch((err) => {
      res.status(500).send({ error: "No se han encontrado peliculas" });
    });
});

router.post("/", (req, res) => {
  let novaPelicula = new Pelicula({
    ...req.body
  });

  novaPelicula
    .save()
    .then((resultat) => {
      res.status(200).send({ ok: true, resultat: resultat });
    })
    .catch((error) => {
      res.status(400).send({
        ok: false,
        error: "Error afegint pel·lícula: " + error.message
      });
    });
});

//PUT
router.put("/:id", (req, res) => {
  Pelicula.findByIdAndUpdate(
    req.params.id,
    { $set: { ...req.body } },
    { new: true }
  )
    .populate("director")
    .then((resultat) => {
      if (!resultat) throw new Error();

      res.status(200).send({ ok: true, resultat: resultat });
    })
    .catch(() => {
      res
        .status(400)
        .send({ ok: false, error: "Error actualizant dades de la pel·lícula" });
    });
});

//PUT plataformes
router.put("/plataforma/:id", (req, res) => {
  let nuevaPlataforma = {
    nom: req.body.nom,
    anyo: req.body.anyo
};

Pelicula.findByIdAndUpdate(req.params.id, {
    $push: {
      plataformes: nuevaPlataforma
    }, $inc: {__v: 1}
}, { new: true, upsert: true/* , runValidators: true */}).then(resultado => {
    res.status(200).send({ resultado: resultado });        
}).catch(error => {
    console.log(error);
    res.status(400).send({ error: "Error modificando las ediciones del juego" });
});
});

//DELETE
router.delete("/:id", (req, res) => {
  Pelicula.findByIdAndRemove(req.params.id)
    .populate("director")
    .then((resultat) => {
      if (!resultat)
        res
          .status(400)
          .send({ ok: false, error: "Error esborrant pel·lícula" });
      else res.status(200).send({ ok: true, resultat: resultat });
    })
    .catch(() => {
      res.status(500).send({ ok: false, error: "Error esborrant pel·lícula" });
    });
});

module.exports = router;
