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

// Ficha de contacto
router.get('/:id', (req, res) => {
    Contacto.findById(req.params['id']).then(resultado => {
        res.render('contactos_ficha', {contacto: resultado});
    }).catch(error => {
        // Aquí podríamos renderizar una página de error
    });
});

module.exports = router;