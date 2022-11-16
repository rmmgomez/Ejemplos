const express = require('express');

let Contacto = require(__dirname + '/../models/contacto.js');
let router = express.Router();

// Listado general
router.get('/', (req, res) => {
    Contacto.find().then(resultado => {
        res.render('contactos_listado', {contactos: resultado});
    }).catch(error => {
        // Aquí podríamos renderizar una página de error
    });
});

// Formulario de alta de contacto
router.get('/nuevo', (req, res) => {
    res.render('contactos_nuevo');
});

// Ficha de contacto
router.get('/:id', (req, res) => {
    Contacto.findById(req.params['id']).then(resultado => {
        res.render('contactos_ficha', {contacto: resultado});
    }).catch(error => {
        // Aquí podríamos renderizar una página de error
    });
});

// Ruta para insertar contactos
router.post('/', (req, res) => {

    let nuevoContacto = new Contacto({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        edad: req.body.edad
    });
    nuevoContacto.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', {error: "Error añadiendo contacto"});
    });
});

// Ruta para borrar contactos
router.delete('/:id', (req, res) => {
    Contacto.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('error', {error: "Error borrando contacto"});
    });
});

module.exports = router;