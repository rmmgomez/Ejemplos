const express = require("express");

let Pelicula = require(__dirname + "/../models/pelicula.js");
let router = express.Router();

router.get("/", (req, res) => {
  Pelicula.find()/* .populate("actor") */.then(resultado => {
    res.status(200).send({resultado: resultado });
  }).catch (error => {
      res.status(500).send({error: "Error obteniendo Pelicula"});
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

//PUT director
router.put("/actor/:idPeli", (req, res) => {
  let nuevoActor = {
    nombre: req.body.nombre,
    edad: req.body.edad
};

Pelicula.findByIdAndUpdate(req.params.idPeli, {
    $push: {
      actor: nuevoActor
    }, $inc: {__v: 1}
}, { upsert: true }).then(resultado => {
    res.status(200).send({ resultado: resultado });        
}).catch(error => {
    console.log(error);
    res.status(400).send({ error: "Error modificando los directores" });
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
