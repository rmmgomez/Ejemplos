import http from 'http'; // Incluimos el módulo
import fs from 'fs'; // Incluimos el módulo fs

/**
 * Método para atender la petición al servidor
 * @param {*} request 
 * @param {*} response 
 */
let peticion = (request, response) => {
    /* response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Bienvenidos a mi servidor con NodeJS"); */
    response.writeHead(200, {"Content-Type": "text/html"});
    let contenido = fs.readFileSync('./index.html', 'utf-8');
    response.write(contenido);
    response.end();
}

// Creamos una instancia del servidor escuchando en el puerto 8080
http.createServer(peticion).listen(8080);