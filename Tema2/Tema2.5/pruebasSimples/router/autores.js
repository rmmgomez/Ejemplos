import express from 'express';

export default (Autor) => {
    let router = express.Router();

    router.get('/', (req, res) => {
        Autor.findAll(/*
           where: {
                nacimiento: { [Sequelize.Op.gte]: 1950 }
            }
        */).then(resultado => { 
            res.status(200).send({  resultado: resultado });
        }).catch(error => {
            res.status(500).send({ error: "Error obteniendo autores" }); 
        });
    });
    
    
    router.get('/:id', (req, res) => {
        Autor.findByPk(req.params['id']).then(resultado => {
            if (resultado) res.status(200).send({ resultado: resultado });
            else res.status(400).send({ error: "Autor no encontrado" });
        }).catch(error => {
            res.status(400).send({ error: "Error buscando autor" });
        });
    });

    // CREATE
    router.post('/', (req, res) => {
        Autor.create({
            nombre: req.body.nombre,
            nacimiento: req.body.nacimiento
        }).then(resultado => {
            if (resultado) res.status(200).send({ resultado: resultado });
            else res.status(400).send({ error: "Error insertando autor" });
        }).catch(error => {
            res.status(400).send({ error: "Error insertando autor" });
        });
    });
    
    // UPDATE
    router.put('/:id', (req, res) => {
        Autor.findByPk(req.params['id']).then(autor => {
            if (autor) return autor.update({ 
                nombre: req.body.nombre,
                nacimiento: req.body.nacimiento });
            else reject ("Error actualizando autor");
        }).then(resultado => {
            res.status(200).send({ resultado: resultado });
        }).catch(error => { 
            res.status(400).send({ error: "Error actualizando autor" }); 
        });
    });
    
    // DESTROY
    router.delete('/:id', (req, res) => {
        Autor.findByPk(req.params['id']).then(autor => {
            if (autor) return autor.destroy();
            else reject ("Error borrando autor");
        }).then(resultado => {
            res.status(200).send({ resultado: resultado });
        }).catch(error => {
            res.status(400).send({ error: "Error borrando autor" });
        });
    });

    return router;
};


