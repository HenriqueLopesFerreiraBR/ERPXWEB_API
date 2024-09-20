const express = require('express');
const ClientController = require('../controllers/ClientController');
const { verifyToken } = require('../middleware/auth');  // Opcional

const router = express.Router();

// Rotas para clientes
router.post('/create', verifyToken, ClientController.create);  // Adicionar um cliente
router.get('/list', ClientController.list);  // Listar todos os clientes
router.put('/update/:id', verifyToken, ClientController.update);  // Atualizar cliente pelo ID
router.delete('/delete/:id', verifyToken, ClientController.delete);  // Deletar cliente pelo ID

module.exports = router;
