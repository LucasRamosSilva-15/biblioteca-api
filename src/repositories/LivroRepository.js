const { Livro, Autor, Categoria } = require("../models");
const { Op } = require("sequelize");


class LivroRepository {
    async BuscarTodos(filtros = {}) {
        const condicoesWhere = {};
        if (filtros.titulo) {
            condicoesWhere.titulo = {
                [Op.like]: `%${filtros.titulo}%`
            };
        }

        if (filtros.autorId) {
            condicoesWhere.autorId = filtros.autorId;
        }

        if (filtros.disponivel !== undefined) {
            condicoesWhere.disponivel = filtros.disponivel === 'true';
        }

        return await Livro.findAll({
            where: condicoesWhere,
            include: [Autor, Categoria]
        });
    }

    async BuscarPorId(id) {
        return await Livro.findByPk(id, {
            include: [Autor, Categoria]
        });
    }

    async Criar(livro) {
        return await Livro.create(livro);
    }

    async Atualizar(id, livro) {
        return await Livro.update(livro, {
            where: {
                id
            }
        });
    }

    async deletar(id) {
        return await Livro.destroy({
            where: {
                id
            }
        });
    }
}
module.exports = new LivroRepository();
