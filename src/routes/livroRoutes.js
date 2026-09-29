const express = require('express');
const router = express.Router();

const LivroController = require('../controllers/LivroController');

router.post('/livros', LivroController.Criar);
router.get('/livros', LivroController.BuscarTodos);
router.get('/livros/:id', LivroController.BuscarPorId);
router.put('/livros/:id', LivroController.Atualizar);
router.delete('/livros/:id', LivroController.deletar);
router.post('/livros/:id/categorias/:categoriaId', LivroController.AssociarCategoria);
router.post('/livros/:id/emprestar', LivroController.Emprestar);
router.put('/livros/:id/devolver', LivroController.devolver);

module.exports = router;