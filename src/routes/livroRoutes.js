const express = require('express');
const router = express.Router();

const LivroController = require('../controllers/LivroController');

router.post('/livros', LivroController.Criar);
router.get('/livros', LivroController.BuscarTodos);
router.get('/livros/:id', LivroController.BuscarPorId);
router.put('/livros/:id', LivroController.Atualizar);
router.delete('/livros/:id', LivroController.deletar);

module.exports = router;