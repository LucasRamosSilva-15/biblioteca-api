const CategoriaService = require('../services/CategoriaService');

class CategoriaController {
    async Criar(req, res) {
        try {
            const categoria = await CategoriaService.Criar(req.body);
            return res.status(201).json(categoria);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async BuscarTodos(req, res) {
        try {
            const categorias = await CategoriaService.BuscarTodos();
            return res.status(200).json(categorias);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async BuscarPorId(req, res) {
        try {
            const categoria = await CategoriaService.BuscarPorId(req.params.id);
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async Atualizar(req, res) {
        try {
            const categoria = await CategoriaService.Atualizar(req.params.id, req.body);
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deletar(req, res) {
        try {
            const categoria = await CategoriaService.deletar(req.params.id);
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}
module.exports = new CategoriaController();
