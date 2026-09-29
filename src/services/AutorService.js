const AutorRepository = require('../repositories/AutorRepository');

class AutorService {
    async BuscarTodos() {
        return await AutorRepository.BuscarTodos();
    }

    async BuscarPorId(id) {
        const BuscaDeId = await AutorRepository.BuscarPorId(id);
        if (!BuscaDeId) {
            throw new Error("Autor não encontrado!");
        } else {
            return BuscaDeId;
        }
    }

    async Criar(autor) {
        if (!autor.nome || !autor.email) {
            throw new Error("Nome e email são obrigatórios!");
        } else {
            return await AutorRepository.Criar(autor);
        }
    }

    async Atualizar(id, autor) {
        return await AutorRepository.Atualizar(id, autor);
    }

    async deletar(id) {
        return await AutorRepository.deletar(id);
    }
}
module.exports = new AutorService();
