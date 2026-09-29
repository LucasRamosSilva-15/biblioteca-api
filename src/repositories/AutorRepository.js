const { Autor, Livro } = require("../models");

class AutorRepository {
    async BuscarTodos(filtros = {}) {
        const page = parseInt(filtros.page) || 1;
        const limit = parseInt(filtros.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Autor.findAndCountAll({
            include: [Livro],
            limit: limit,
            offset: offset
        });

        return {
            data: rows,
            pagination: {
                page: page,
                limit: limit,
                total: count,
                totalPages: Math.ceil(count / limit)
            }
        };
    }

    async BuscarPorId(id) {
        return await Autor.findByPk(id, {
            include: [Livro]
        });
    }

    async Criar(autor) {
        return await Autor.create(autor);
    }

    async Atualizar(id, autor) {
        return await Autor.update(autor, {
            where: {
                id
            }
        });
    }

    async deletar(id) {
        return await Autor.destroy({
            where: {
                id
            }
        });
    }
}
module.exports = new AutorRepository();