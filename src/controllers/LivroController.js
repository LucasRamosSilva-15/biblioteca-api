const LivroService = require('../services/LivroService');

class LivroController {
    async Criar(req, res) {
        try {
            const livro = await LivroService.Criar(req.body);
            return res.status(201).json(livro);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async AssociarCategoria(req, res) {
        try {
            const livroId = req.params.id;
            const categoriaId = req.params.categoriaId;
            const livro = await LivroService.AssociarCategoria(livroId, categoriaId);
            return res.status(200).json(livro);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async BuscarTodos(req, res) {
        try {
            const filtros = req.query;
            const livros = await LivroService.BuscarTodos(filtros);
            return res.status(200).json(livros);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async BuscarPorId(req, res) {
        try {
            const livro = await LivroService.BuscarPorId(req.params.id);
            return res.status(200).json(livro);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async Atualizar(req, res) {
        try {
            const livro = await LivroService.Atualizar(req.params.id, req.body);
            return res.status(200).json(livro);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deletar(req, res) {
        try {
            const livro = await LivroService.deletar(req.params.id);
            return res.status(200).json(livro);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}
module.exports = new LivroController();
