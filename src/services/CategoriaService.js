const CategoriaRepository = require('../repositories/CategoriaRepository');

class CategoriaService {
    async BuscarTodos() {
        return await CategoriaRepository.BuscarTodos();
    }

    async BuscarPorId(id) {
        const BuscaDeId = await CategoriaRepository.BuscarPorId(id);
        if (!BuscaDeId) {
            throw new Error("Categoria não encontrada!");
        } else {
            return BuscaDeId;
        }
    }

    async Criar(categoria) {
        if (!categoria.nome || !categoria.descricao) {
            throw new Error("Nome e descrição são obrigatórios!");
        } else {
            return await CategoriaRepository.Criar(categoria);
        }
    }

    async Atualizar(id, categoria) {
        return await CategoriaRepository.Atualizar(id, categoria);
    }

    async deletar(id) {
        return await CategoriaRepository.deletar(id);
    }
}
module.exports = new CategoriaService();