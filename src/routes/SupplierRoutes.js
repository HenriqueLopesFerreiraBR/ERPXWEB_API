const express = require('express');
const SupplierController = require('../controllers/SupplierController');
const { verifyToken } = require('../middleware/auth');  // Se você deseja usar autenticação JWT

const router = express.Router();

// Rotas de fornecedores
router.post('/create', verifyToken, SupplierController.create);  // Criar fornecedor
router.get('/list', verifyToken, SupplierController.list);  // Listar fornecedores
router.put('/update/:id', verifyToken, SupplierController.update);  // Atualizar fornecedor
router.delete('/delete/:id', verifyToken, SupplierController.delete);  // Deletar fornecedor

module.exports = router;
