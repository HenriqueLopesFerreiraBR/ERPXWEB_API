// src/routes/indexRoutes.js
const express = require('express');
const productRoutes = require('./ProductRoutes');
const userRoutes = require('./UserRoutes');
const clientRoutes = require('./ClientRoutes');
const manufacturerRoutes = require('./ManufacturerRoutes');
const orderRoutes = require('./OrderRoutes');
const saleRoutes = require('./SaleRoutes');
const purchaseRoutes = require('./PurchaseRoutes');
const stockRoutes = require('./StockRoutes');
const supplierRoutes = require('./SupplierRoutes');

const router = express.Router();

// Consolidando todas as rotas aqui
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/manufacturers', manufacturerRoutes);
router.use('/orders', orderRoutes);
router.use('/sales', saleRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/stock', stockRoutes);
router.use('/suppliers', supplierRoutes);

module.exports = router;
