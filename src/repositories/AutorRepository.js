const { Autor } = require("../models");

class AutorRepository {
    async BuscarTodos() {
        return await Autor.findAll({
            include: [Livro]
        });
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