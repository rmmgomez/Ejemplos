// Librerías externas
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Enrutadores
import mascotas from './routes/mascotas.js';
import restaurantes from './routes/restaurantes.js';
import contactos from './routes/contactos.js';

// Conexión con la BD
mongoose.connect('mongodb://127.0.0.1:27017/contactos', {useNewUrlParser: true});
let app = express();

// Carga de middleware y enrutadores
app.use(bodyParser.json());
app.use('/mascotas', mascotas);
app.use('/restaurantes', restaurantes);
app.use('/contactos', contactos);

// Puesta en marcha del servidor
app.listen(8080);