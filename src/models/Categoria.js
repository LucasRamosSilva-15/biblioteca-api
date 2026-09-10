const {
Model,
DataTypes
} = require("sequelize");
const sequelize = require("../config/database");
class Categoria extends Model {}
Categoria.init(
{
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
nome: {
type: DataTypes.STRING,
allowNull: false,
unique: true
},
descricao: {
type: DataTypes.STRING,
allowNull: true
}
},
{
sequelize,
modelName: "Categoria"
,
tableName: "categorias"
}
);