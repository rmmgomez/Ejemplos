import mongoose from 'mongoose';

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

let Contacto = mongoose.model('contacto', contactoSchema);
export default Contacto;