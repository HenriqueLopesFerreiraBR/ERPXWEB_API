const express = require('express');
const OrderController = require('../controllers/OrderController');
const { verifyToken } = require('../middleware/auth');  // Opcional

const router = express.Router();

// Rotas para pedidos
router.post('/create', verifyToken, OrderController.create);  // Criar um pedido
router.get('/list', verifyToken, OrderController.list);  // Listar pedidos
router.put('/update/:id', verifyToken, OrderController.update);  // Atualizar pedido
router.delete('/delete/:id', verifyToken, OrderController.delete);  // Deletar pedido

module.exports = router;
