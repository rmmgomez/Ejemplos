// Importamos la librería mongoose para conectarnos a nuestra bbdd de mongodb
import mongoose from 'mongoose';

// Nos conectamos a la bbdd contactos, indicandole la url donde la tenemos y el puerto
mongoose.connect('mongodb://localhost:27017/contactos'); // No es necesario crearla, nos la crea automáticamente

// Definimos la estructura de los documentos
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
    }
});
// Asociamos el esquema a nuestra colección de contactOS en plural
let Contacto = mongoose.model('contactos', contactoSchema);

/* let contacto1 = new Contacto({
    nombre: "Rosa",
    telefono: "666777888",
    edad: 36
});
contacto1.save().then(resultado => {
    console.log("Contacto añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo contacto:", error);
}); */

/* let contacto2 = new Contacto({
    nombre: "Hulio",
    telefono: "777888999",
    edad: 136
});
contacto2.save().then(resultado => {
    console.log("Contacto añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo contacto:", error);
}); */

/* Contacto.find().then(resultado => {
    console.log(resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

Contacto.find({ edad: {$gte:18, $lte:36 }}).then(resultado => {
    console.log('Resultado de búsqueda: ', resultado);
}).catch(error => {
    console.log("ERROR:", error);
}); */


// Búsqueda parametrizada
/* Contacto.find()
    .where('edad')
    .gte(18)
    .sort('edad')
    .limit(10)
    .then(resultado => {
        console.log('Resultado de la búsqueda:', resultado);
    })
    .catch(error => {
        console.log('ERROR:', error);
    });
// Te devuelve uno, no un array
Contacto.findOne({ nombre: 'Rosa', edad: 36 })
    .then(resultado => {
        console.log('Resultado de la búsqueda:', resultado);
    })
    .catch(error => {
        console.log('ERROR:', error);
    });
// Busca por el id autogenerado por mongod
Contacto.findById('6348779971b8120813ec8ebb')
    .then(resultado => {
        console.log('Resultado de la búsqueda por ID:', resultado);
    })
    .catch(error => {
        console.log('ERROR:', error);
    }); */

/* Contacto.updateMany({ nombre: 'Rosa' }, { edad: 20 }).then(resultado => {
    console.log("Contacto modificado:", resultado);
}).catch(error => {
    console.log("ERROR modificando contacto:", error);
});
Contacto.find().then(resultado => {
    console.log(resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

Contacto.findByIdAndUpdate('6348779971b8120813ec8ebb',
    { nombre: 'Nacho Iborra', edad: 40 } , { new: true })
    .then(resultado => {
        console.log("Modificado contacto:", resultado);
    }).catch(error => {
        console.log("ERROR:", error);
    }); */

// Elimina de la bbdd todos los contactos que se llamen Rosa
// remove está deprecated, usad: deleteOne o deleteMany
/* Contacto.deleteMany({nombre: 'Rosa'}).then(resultado => {
    console.log(resultado);
}).catch (error => {
    console.log("ERROR:", error);
}); */


// Usando callbacks
/* Contacto.findById('6357a5b5fd02cc2bac8efce1', (error, contacto)=>{
    if(error) console.log("Error" + error);
    else console.log("Contacto-->" + contacto);
}); */

/* Contacto.findById('6357f35cf3a7dbf23e50509d', (error, contacto) =>{
    if(error) console.log("Error" + error);
    else {
        contacto.edad++;
        contacto.save((errActualizar, cActualizado)=>{
            if(errActualizar) console.log("Error al actualizar: " + errActualizar);
            else console.log("Actualuzado: " + cActualizado);
        });  
    }    
});
 */
/* async function actualizarEdad(){
    try{
        let contacto = await Contacto.findById('6358e9b6779211017cb165c2');
        contacto.edad++;
        let actualizado = await contacto.save(); // Actualizo la edad al contacto
        console.log(actualizado); // Muestro el contacto actualizado
    }catch(error) {
        console.log("Error actualizando: " + error);
    }
}

actualizarEdad(); */