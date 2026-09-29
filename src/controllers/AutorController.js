const AutorService = require('../services/AutorService');

class AutorController {
    async Criar(req, res) {
        try {
            const autor = await AutorService.Criar(req.body);
            return res.status(201).json(autor);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async BuscarTodos(req, res) {
        try {
            const autores = await AutorService.BuscarTodos();
            return res.status(200).json(autores);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async BuscarPorId(req, res) {
        try {
            const autor = await AutorService.BuscarPorId(req.params.id);
            return res.status(200).json(autor);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async Atualizar(req, res) {
        try {
            const autor = await AutorService.Atualizar(req.params.id, req.body);
            return res.status(200).json(autor);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async deletar(req, res) {
        try {
            const autor = await AutorService.deletar(req.params.id);
            return res.status(200).json(autor);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}
module.exports = new AutorController();