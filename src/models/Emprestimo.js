const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require("../config/database");
class Emprestimo extends Model { }
Emprestimo.init(
    {
        dataEmprestimo: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dataDevolucao: {
            type: DataTypes.DATE,
            allowNull: true
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        sequelize,
        modelName: "Emprestimo",
        tableName: "emprestimos"
    }
);

module.exports = Emprestimo;