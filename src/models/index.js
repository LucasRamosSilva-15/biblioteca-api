const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require("../config/database");
const Autor = require('./Autor');
const Livro = require('./Livro');
const Categoria = require('./Categoria');
const Emprestimo = require('./Emprestimo');

Autor.hasMany(Livro, {
    foreignKey: "autorId"
});

Livro.belongsTo(Autor, {
    foreignKey: "autorId"
});

Livro.belongsToMany(Categoria, {
    through: "LivroCategoria",
    foreignKey: "livroId",
    otherKey: "categoriaId"
});

Categoria.belongsToMany(Livro, {
    through: "LivroCategoria",
    foreignKey: "categoriaId",
    otherKey: "livroId"
});

Livro.hasMany(Emprestimo, {
    foreignKey: "livroId"
});

Emprestimo.belongsTo(Livro, {
    foreignKey: "livroId"
});

module.exports = {
    Autor,
    Livro,
    Categoria,
    Emprestimo,
    sequelize
};
