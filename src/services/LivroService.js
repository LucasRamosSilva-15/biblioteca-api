const LivroRepository = require('../repositories/LivroRepository');
const CategoriaRepository = require('../repositories/CategoriaRepository');

class LivroService {
    async BuscarTodos(filtros) {
        return await LivroRepository.BuscarTodos(filtros);
    }

    async BuscarPorId(id) {
        const BuscaDeId = await LivroRepository.BuscarPorId(id);
        if (!BuscaDeId) {
            throw new Error("Livro não encontrado!");
        } else {
            return BuscaDeId;
        }
    }
    async AssociarCategoria(livroId, categoriaId) {
        const livro = await LivroRepository.BuscarPorId(livroId);
        const categoria = await CategoriaRepository.BuscarPorId(categoriaId);
        if (!livro) {
            throw new Error("Livro não encontrado!");
        } else if (!categoria) {
            throw new Error("Categoria não encontrada!");
        } else {
            await livro.addCategoria(categoria);
            return {
                message: "Categoria associada ao livro com sucesso!"
            };
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
