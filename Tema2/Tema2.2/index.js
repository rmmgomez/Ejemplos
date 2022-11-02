// Importamos la librería mongoose para conectarnos a nuestra bbdd de mongodb
import mongoose from 'mongoose';

// Nos conectamos a la bbdd contactos, indicandole la url donde la tenemos y el puerto
mongoose.connect('mongodb://localhost:27017/contactos'); // No es necesario crearla, nos la crea automáticamente

let restauranteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    }
});
let Restaurante = mongoose.model('restaurante', restauranteSchema);

let mascotaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['perro', 'gato', 'otros']
    }
});
let Mascota = mongoose.model('mascota', mascotaSchema);

// Definimos la estructura del contacto
let contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // Elimina los espacios del ppio/final
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/ // Expresión regular, la cadena deben ser 9 dígitos
    },
    edad: {
        type: Number,
        min: 18,
        max: 120
    },
    restauranteFavorito: {
        type: mongoose.Schema.ObjectId, // Hace referencia al id de otra colección
        ref: 'restaurante' // De esta colección
    }, // 1 contacto 1 restaurante favorito
    mascotas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mascota'
    }] // 1 contacto, muchas mascotas porquehay CORCHETES
});
// Asociamos el esquema a nuestra colección de contactOS en plural
let Contacto = mongoose.model('contactos', contactoSchema);

/* let restaurante1 = new Restaurante({
    nombre: "La Tagliatella",
    direccion: "C.C. San Vicente s/n",
    telefono: "965678912"
});
restaurante1.save().then(resultado => {
    console.log("Restaurante añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo el restaurante:", error);
});
let mascota1 = new Mascota({
    nombre: "Lola",
    tipo: "perro"
});
mascota1.save().then(resultado => {
    console.log("Mascota añadida:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo la mascota:", error);
}); 
let mascota2 = new Mascota({
    nombre: "Basurete",
    tipo: "otros"
});
mascota2.save().then(resultado => {
    console.log("Mascota añadida:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo la mascota:", error);
}); */

/* let contacto1 = new Contacto({
    nombre: "Nacho",
    telefono: 677889900,
    edad: 40,
    restauranteFavorito: '6358ecb77e2ad8533ed0cbb7',
    mascotas: ['6358ecb77e2ad8533ed0cbb9',
        '6358ecb77e2ad8533ed0cbb8']
});
contacto1.save().then(resultado => {
    console.log("Contacto añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo al contacto:", error);
}); */


/* Contacto.find().then(resultado =>{
    console.log(resultado);
}); */

Contacto.find().populate('restauranteFavorito').then(resultado =>{
    console.log(resultado);
});

/* 



Contacto.find({edad: {$gt: 30}}, 'nombre edad').then(resultado =>{
    console.log(resultado);
});
// Orden descendente
Contacto.find().sort('-edad').limit(5).then(resultado =>{
    console.log(resultado);
}); */