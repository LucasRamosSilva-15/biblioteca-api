const express = require('express');
const router = express.Router();

const AutorController = require('../controllers/AutorController');

router.post('/autores', AutorController.Criar);
router.get('/autores', AutorController.BuscarTodos);
router.get('/autores/:id', AutorController.BuscarPorId);
router.put('/autores/:id', AutorController.Atualizar);
router.delete('/autores/:id', AutorController.deletar);

module.exports = router;
