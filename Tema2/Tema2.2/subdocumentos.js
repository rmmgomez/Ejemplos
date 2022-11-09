import mongoose from 'mongoose';

// Nos conectamos a la bbdd contactos, indicandole la url donde la tenemos y el puerto
mongoose.connect('mongodb://localhost:27017/contactos_subdocumentos'); // No es necesario crearla, nos la crea automáticamente

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
    restauranteFavorito: restauranteSchema, // 1 contacto 1 restaurante favorito
    mascotas: [mascotaSchema] // 1 contacto, muchas mascotas porquehay CORCHETES
});
// Asociamos el esquema a nuestra colección de contactOS en plural
let Contacto = mongoose.model('contactos', contactoSchema);

let contacto1 = new Contacto({
    nombre: 'Nacho',
    telefono: 966112233,
    edad: 39,
    restauranteFavorito: {
        nombre: 'La Tagliatella',
        direccion: 'C.C. San Vicente s/n',
        telefono: 961234567
    }
});
contacto1.mascotas.push({ nombre: 'Otto', tipo: 'perro' });
contacto1.mascotas.push({ nombre: 'Sonic', tipo: 'otros' });
contacto1.save().then(resultado => {
    console.log("Contacto añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo al contacto:", error);
});

Contacto.find().populate("mascotas").then(resultado =>{
    console.log(resultado);
});