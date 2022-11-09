import { Sequelize } from "sequelize";

export default (conexion) => {    
    const Autor = conexion.define('autores', {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nacimiento: {type: Sequelize.INTEGER}
    });

    return Autor;
};


