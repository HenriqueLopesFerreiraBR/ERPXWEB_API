const express = require('express');
const SaleController = require('../controllers/SaleController');
const { verifyToken } = require('../middleware/auth');  // Opcional

const router = express.Router();

// Rotas para vendas
router.post('/create', verifyToken, SaleController.create);  // Adicionar uma venda
router.get('/list', verifyToken, SaleController.list);  // Listar todas as vendas
router.put('/update/:id', verifyToken, SaleController.update);  // Atualizar venda pelo ID
router.delete('/delete/:id', verifyToken, SaleController.delete);  // Deletar venda pelo ID

module.exports = router;
