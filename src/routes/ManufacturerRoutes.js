const express = require('express');
const ManufacturerController = require('../controllers/ManufacturerController');
const { verifyToken } = require('../middleware/auth');  // Opcional

const router = express.Router();

// Rotas para fabricantes
router.post('/create', verifyToken, ManufacturerController.create);  // Adicionar um fabricante
router.get('/list', ManufacturerController.list);  // Listar todos os fabricantes
router.put('/update/:id', verifyToken, ManufacturerController.update);  // Atualizar fabricante pelo ID
router.delete('/delete/:id', verifyToken, ManufacturerController.delete);  // Deletar fabricante pelo ID

module.exports = router;
