import Sequelize from "sequelize";
import express from "express";

// Cargamos los modelos
import modeloAutor from './models/autor.js';
import modeloLibro from './models/libro.js';

// Cargamos los routers
import routerAutor from './router/autores.js';
import routerLibro from './router/libros.js';

// Conectamos la BBDD
const conexionBD = new Sequelize('libros', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released.
        }
});
// Creamos la instancia a cada modelo
const Autor = modeloAutor(conexionBD);
const Libro = modeloLibro(conexionBD);

// Creamos la relación 1:N, 1 libro pertenece a 1 autor, y 1 autor tenr muchios libros
Libro.belongsTo(Autor, {foreignKey: 'idAutor', as: 'Autor'});

// Creamos la instancia a cada router
const autores = routerAutor(Autor);
const libros = routerLibro(Libro, Autor);

// Cargamos express
let app = express();
app.use(express.json());
// enrutadores asociados a las rutas
app.use('/libros', libros);
app.use('/autores', autores);

// Sisncronizamos y forzamos que si habia algo en la bbdd se lo cargue (force = true)
conexionBD.sync(/* {force: true} */).then(() => {
    app.listen(8080);
}).catch (error => {
    console.log(error);
});