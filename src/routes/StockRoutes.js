const express = require('express');
const StockController = require('../controllers/StockController');
const { verifyToken } = require('../middleware/auth');  // Opcional

const router = express.Router();

// Rotas para estoque
router.get('/list', verifyToken, StockController.list);  // Listar o estoque

module.exports = router;
