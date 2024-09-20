const express = require('express');
const ProductController = require('../controllers/ProductController');
const { verifyToken } = require('../middleware/auth');  // Opcional, caso use autenticação JWT

const router = express.Router();

// Rotas para produtos
router.post('/create', verifyToken, ProductController.create);  // Adicionar um produto
router.get('/list', ProductController.list);  // Listar todos os produtos
router.put('/update/:id', verifyToken, ProductController.update);  // Atualizar produto pelo ID
router.delete('/delete/:id', verifyToken, ProductController.delete);  // Deletar produto pelo ID

module.exports = router;
