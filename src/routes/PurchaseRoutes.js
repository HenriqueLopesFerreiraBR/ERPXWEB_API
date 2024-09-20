const express = require('express');
const PurchaseController = require('../controllers/PurchaseController');
const { verifyToken } = require('../middleware/auth');  // Opcional

const router = express.Router();

// Rotas para compras
router.post('/create', verifyToken, PurchaseController.create);  // Adicionar uma compra
router.get('/list', verifyToken, PurchaseController.list);  // Listar todas as compras
router.delete('/delete/:id', verifyToken, PurchaseController.delete);  // Deletar uma compra pelo ID

module.exports = router;
