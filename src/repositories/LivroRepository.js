const { Livro } = require("../models");

class LivroRepository {
    async BuscarTodos() {
        return await Livro.findAll();
    }

    async BuscarPorId(id) {
        return await Livro.findByPk(id);
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
