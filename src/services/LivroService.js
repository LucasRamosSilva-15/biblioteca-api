const LivroRepository = require('../repositories/LivroRepository');

class LivroService {
    async BuscarTodos() {
        return await LivroRepository.BuscarTodos();
    }

    async BuscarPorId(id) {
        const BuscaDeId = await LivroRepository.BuscarPorId(id);
        if (!BuscaDeId) {
            throw new Error("Livro não encontrado!");
        } else {
            return BuscaDeId;
        }
    }

    async Criar(livro) {
        if (!livro.titulo || !livro.isbn || !livro.ano || !livro.autorId) {
            throw new Error("Título, ISBN, ano e autor são obrigatórios!");
        } else {
            return await LivroRepository.Criar(livro);
        }
    }

    async Atualizar(id, livro) {
        return await LivroRepository.Atualizar(id, livro);
    }

    async deletar(id) {
        return await LivroRepository.deletar(id);
    }
}
module.exports = new LivroService();
