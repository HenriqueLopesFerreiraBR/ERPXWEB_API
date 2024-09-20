const Sale = require('../models/Sale');
const Client = require('../models/Client');
const Product = require('../models/Product');

class SaleController {
  // Criar uma venda
  async create(req, res) {
    const { clientId, productId, quantity } = req.body;

    try {
      // Verificar se o cliente e o produto existem
      const client = await Client.findByPk(clientId);
      const product = await Product.findByPk(productId);

      if (!client || !product) {
        return res.status(404).json({ message: 'Client or Product not found' });
      }

      const totalPrice = product.price * quantity;

      const sale = await Sale.create({
        clientId,
        productId,
        quantity,
        totalPrice,
      });

      res.status(201).json({ message: 'Sale created', sale });
    } catch (error) {
      res.status(400).json({ error: 'Sale creation failed', details: error.message });
    }
  }

  // Listar todas as vendas
  async list(req, res) {
    try {
      const sales = await Sale.findAll({
        include: [Client, Product],  // Incluir dados do cliente e produto nas vendas
      });
      res.status(200).json(sales);
    } catch (error) {
      res.status(400).json({ error: 'Failed to list sales', details: error.message });
    }
  }

  // Atualizar uma venda
  async update(req, res) {
    const { id } = req.params;
    const { clientId, productId, quantity } = req.body;

    try {
      const sale = await Sale.findByPk(id);

      if (!sale) {
        return res.status(404).json({ message: 'Sale not found' });
      }

      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      sale.clientId = clientId || sale.clientId;
      sale.productId = productId || sale.productId;
      sale.quantity = quantity || sale.quantity;
      sale.totalPrice = product.price * sale.quantity;

      await sale.save();
      res.status(200).json({ message: 'Sale updated', sale });
    } catch (error) {
      res.status(400).json({ error: 'Sale update failed', details: error.message });
    }
  }

  // Deletar uma venda
  async delete(req, res) {
    const { id } = req.params;

    try {
      const sale = await Sale.findByPk(id);

      if (!sale) {
        return res.status(404).json({ message: 'Sale not found' });
      }

      await sale.destroy();
      res.status(200).json({ message: 'Sale deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Sale deletion failed', details: error.message });
    }
  }
}

module.exports = new SaleController();
