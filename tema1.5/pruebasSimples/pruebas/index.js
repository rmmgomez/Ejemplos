import express from 'express';

let contactos = [
    { nombre: "Nacho", edad: 41, telefono: "611223344" },
    { nombre: "Ana", edad: 37, telefono: "699887766" },
    { nombre: "Juan", edad: 70, telefono: "965661564" },
    { nombre: "Fina", edad: 68, telefono: "965262861" },
    { nombre: "Enrique", edad: 12, telefono: "965262861" },
    { nombre: "Pepe", edad: 15, telefono: "966555555" }
];

let contactosJSON = JSON.stringify(contactos); // convierte a JSON
let contactos2 = JSON.parse(contactosJSON); // de JSON a objeto / array obj

// inicializamos el objeto
let app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Mi servidor con express");
});
// nodeMOOON! 

/*app.get('/contactos/telefono/:numero', (req, res) => {
    let resultado = contactos.filter(contacto => contacto.telefono == req.params['numero']);
    res.send(resultado);
});*/

/* app.get('/contactos', (req, res) => {
    if(req.query.telefono){ // queryString de telefono
        let resultado = contactos.filter(contacto => contacto.telefono == req.query.telefono);
        res.send(resultado);
    }else res.send(resultado);
});
 */
app.get('/contactos', (req, res) => {

    if (req.query.telefono) { // queryString de telefono
        let resultado = contactos.filter(contacto => contacto.telefono === req.query.telefono);
        if (resultado && resultado.length > 0) {
            res.status(200).send({contactos: resultado });
        } else { // No hay contactos con ese teléfono --> Error 400
            res.status(400).send({error: "No hay contactos con ese teléfono" });
        }
    } else { // Listado de contactos completo
        if (contactos && contactos.length > 0) {
            res.status(200).send({contactos: contactos });
        } else { // Si falla el servidor a la hora de recuperar los datos --> error 500
            res.status(500).send({error: "No se han encontrado contactos" });
        }
    }
});

// Para dar de alta
app.post('/contactos', (req, res) => {
    let newContact = { nombre: req.body.nombre, edad: req.body.edad, telefono: req.body.telefono };
    // Comprobamos si existe ya ese contacto (nombre repetido)
    let existe = contactos.filter(contact => contact.nombre === newContact.nombre);
    if (existe.length === 0) { // Lo añadimos y enviamos un ok
        contactos.push(newContact);
        res.status(201).send(newContact); // Se inserta un objeto
    } else { // Enviamos el error
        res.status(400).send({error: "Contacto duplicado" });
    }
});

app.put('/contactos', (req, res) => {
    if (req.query.nombre) { // Modificamos por nombre, siempre debe ser la CP, que suele ser un id
        let existe = contactos.filter(contacto => contacto.nombre === req.query.nombre);
        if (existe.length > 0) {
            let contacto = existe[0];
            contacto.nombre = req.body.nombre;
            contacto.edad = req.body.edad;
            contacto.telefono = req.body.telefono;
            res.status(200).send(contacto);
        } else {
            res.status(400).send({error: `El contacto ${req.query.nombre} no existe` });
        }
    }else {
        res.status(400).send({error: "Se require un nombre" });
    }

});

app.delete('/contactos', (req, res) => {
    let filtrado = contactos.filter(
        contacto => contacto.nombre != req.query.nombre
    );
    if (filtrado.length != contactos.length) {
        // El contacto existe. Reemplazamos el array y OK
        contactos = filtrado;
        res.status(204).send({error: "Contacto no sdsadas sdadºa dasd asdasd"}); // El mensaje 204 no devuelve nada, solo el status
    } else {
        // No se ha filtrado nada. El contacto no existe
        res.status(400).send({error: `Contacto: '${req.query.nombre}' no encontrado `});
    }
});


// lo ponemos a escuchar en el puerto 8080
app.listen(8080);