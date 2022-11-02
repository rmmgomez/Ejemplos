import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';


let conexion = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'contactos'
    }
);

let app = express();
app.use(bodyParser.json());

/**
 * Listado de todos los contactos
 */
app.get('/contactos', (req, res) => {
    conexion.query("SELECT * FROM contactos",
        (error, resultado, campos) => {
            if (error)
                res.status(500).send({ error: "Error listando contactos" });
            else
                res.status(200).send({ resultado: resultado });
        });
});
/**
 * Listado de los contactos por id
 */
app.get('/contactos/:id', (req, res) => {
    conexion.query("SELECT * FROM contactos WHERE id = ?",
        req.params['id'], (error, resultado, campos) => {
            if (error || !resultado || resultado.length == 0)
                res.status(400).send({ error: "Error buscando contacto" });
            else
                res.status(200)
                    .send({ resultado: resultado[0] });
        });
});

/**
 * Inserción contacto
 */
app.post('/contactos', (req, res) => {
    let nuevoContacto = {
        nombre: req.body.nombre,
        telefono: req.body.telefono
    };
    conexion.query("INSERT INTO contactos SET ?",
        nuevoContacto, (error, resultado, campos) => {
            if (error)
                res.status(400)
                    .send({ error: "Error insertando contacto" });
            else
                res.status(200)
                    .send({ resultado: resultado });
        });
});

/**
 * Modificar contacto
 */

app.put('/contactos/:id', (req, res) => {
    let datosModificados = {
        nombre: req.body.nombre,
        telefono: req.body.telefono
    };
    conexion.query("UPDATE contactos SET ? WHERE id = ?",
        [datosModificados, req.params['id']],
        (error, resultado, campos) => {
            if (error)
                res.status(400).send({error: "Error modificando contacto"});
            else
                res.status(200).send({resultado: resultado});
        });
});

/**
 * Borrar contacto
 */

 app.delete('/contactos/:id', (req, res) => {
    conexion.query("DELETE FROM contactos WHERE id = ?",
    req.params['id'], (error, resultado, campos) => {
        if (error)
            res.status(400).send({error: "Error eliminando contacto" });
        else
            res.status(200).send({resultado: resultado });
    });
});
app.listen(8080);