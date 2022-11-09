import { Sequelize } from "sequelize";

export default (conexion) => {
    const Libro = conexion.define('libros', {
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        editorial: {type: Sequelize.STRING}
    });

    return Libro;
};


