const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require("../config/database");
class Autor extends Model { }
Autor.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        nacionalidade: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: "Autor"
        ,
        tableName: "autores"
    }
);
module.exports = Autor;
