const { Categoria } = require("../models");

class CategoriaRepository {
    async BuscarTodos() {
        return await Categoria.findAll();
    }

    async BuscarPorId(id) {
        return await Categoria.findByPk(id);
    }

    async Criar(categoria) {
        return await Categoria.create(categoria);
    }

    async Atualizar(id, categoria) {
        return await Categoria.update(categoria, {
            where: {
                id
            }
        });
    }

    async deletar(id) {
        return await Categoria.destroy({
            where: {
                id
            }
        });
    }
}
module.exports = new CategoriaRepository();
