// Aquí definimos los servicios
import  express from 'express';
import Contacto from './../models/contacto.js';
let router = express.Router();

// Servicio de listado general
router.get('/', (req, res) => {
    Contacto.find().then(resultado => {
        res.status(200).send({resultado: resultado });
    }).catch (error => {
        res.status(500).send({error: "Error obteniendo contactos"});
    }); 
});

// Servicio de listado por id
router.get('/:id', (req, res) => {
    Contacto.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200).send({resultado: resultado });
        else
            res.status(400).send({error: "No se han encontrado contactos" });
    }).catch (error => {
        res.status(400).send({error: "Error buscando el contacto indicado" });
    }); 
});

// Servicio para insertar contactos
router.post('/', (req, res) => {

    let nuevoContacto = new Contacto({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        edad: req.body.edad
    });
    nuevoContacto.save().then(resultado => {
        res.status(200).send({resultado: resultado});
    }).catch(error => {
        res.status(400).send({error: "Error añadiendo contacto"});
    });
});

// Servicio para modificar contactos
router.put('/:id', (req, res) => {

    Contacto.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            edad: req.body.edad
        }
    }, {new: true}).then(resultado => {
        if (resultado)
            res.status(200).send({resultado: resultado});
        else
            res.status(400).send({error: "Contacto no encontrado"});
    }).catch(error => {
        res.status(400).send({error:"Error actualizando contacto"});
    });
});

// Servicio para borrar contactos
router.delete('/:id', (req, res) => {

    Contacto.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.status(200).send({resultado: resultado});
        else res.status(400).send({error: "Contacto no encontrado"});
    }).catch(error => {
        res.status(400).send({error:"Error eliminando contacto"});
    });
});

export default router;