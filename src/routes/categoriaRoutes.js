const express = require('express');
const router = express.Router();

const CategoriaController = require('../controllers/CategoriaController');

router.post('/categorias', CategoriaController.Criar);
router.get('/categorias', CategoriaController.BuscarTodos);
router.get('/categorias/:id', CategoriaController.BuscarPorId);
router.put('/categorias/:id', CategoriaController.Atualizar);
router.delete('/categorias/:id', CategoriaController.deletar);

module.exports = router;