const {
Model,
DataTypes
} = require("sequelize");
const sequelize = require("../config/database");
class Livro extends Model {}
Livro.init(
{
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true
},
titulo: {
type: DataTypes.STRING,
allowNull: false,
},
isbn: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
},
ano: {
type: DataTypes.INTEGER,
allowNull: false,
},
disponivel: {
type: DataTypes.BOOLEAN,
allowNull: false,
defaultValue: true
},
autorId: {
type: DataTypes.INTEGER,
allowNull: false,
references: {
model: "autores",
key: "id"
}
}
},
{
sequelize,
modelName: "Livro"
,
tableName: "livros"
}
);