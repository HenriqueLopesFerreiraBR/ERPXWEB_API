const Stock = require('../models/Stock');
const Product = require('../models/Product');

class StockController {
  // Listar o estoque
  async list(req, res) {
    try {
      const stockItems = await Stock.findAll({
        include: [Product],  // Incluir dados do produto
      });
      res.status(200).json(stockItems);
    } catch (error) {
      res.status(400).json({ error: 'Failed to list stock', details: error.message });
    }
  }
}

module.exports = new StockController();
