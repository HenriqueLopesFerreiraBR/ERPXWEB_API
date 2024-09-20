const Purchase = require('../models/Purchase');
const Stock = require('../models/Stock');
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

class PurchaseController {
  // Criar uma compra
  async create(req, res) {
    const { supplierId, productId, quantity } = req.body;

    try {
      const supplier = await Supplier.findByPk(supplierId);
      const product = await Product.findByPk(productId);

      if (!supplier || !product) {
        return res.status(404).json({ message: 'Supplier or Product not found' });
      }

      const totalPrice = product.price * quantity;

      // Criar compra
      const purchase = await Purchase.create({
        supplierId,
        productId,
        quantity,
        totalPrice,
      });

      // Atualizar estoque
      let stock = await Stock.findOne({ where: { productId } });
      if (!stock) {
        stock = await Stock.create({ productId, quantity });
      } else {
        stock.quantity += quantity;
        await stock.save();
      }

      res.status(201).json({ message: 'Purchase created and stock updated', purchase });
    } catch (error) {
      res.status(400).json({ error: 'Purchase creation failed', details: error.message });
    }
  }

  // Listar todas as compras
  async list(req, res) {
    try {
      const purchases = await Purchase.findAll({
        include: [Supplier, Product],  // Incluir dados do fornecedor e produto
      });
      res.status(200).json(purchases);
    } catch (error) {
      res.status(400).json({ error: 'Failed to list purchases', details: error.message });
    }
  }

  // Deletar uma compra
  async delete(req, res) {
    const { id } = req.params;

    try {
      const purchase = await Purchase.findByPk(id);

      if (!purchase) {
        return res.status(404).json({ message: 'Purchase not found' });
      }

      // Atualizar estoque
      const stock = await Stock.findOne({ where: { productId: purchase.productId } });
      if (stock) {
        stock.quantity -= purchase.quantity;
        await stock.save();
      }

      await purchase.destroy();
      res.status(200).json({ message: 'Purchase deleted and stock updated' });
    } catch (error) {
      res.status(400).json({ error: 'Purchase deletion failed', details: error.message });
    }
  }
}

module.exports = new PurchaseController();
