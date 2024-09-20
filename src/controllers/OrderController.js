const Order = require('../models/Order');
const Client = require('../models/Client');
const Product = require('../models/Product');

class OrderController {
  // Criar um pedido
  async create(req, res) {
    const { clientId, status, totalAmount, products } = req.body;

    try {
      const client = await Client.findByPk(clientId);
      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      const order = await Order.create({ clientId, status, totalAmount });

      if (products && products.length > 0) {
        const productInstances = await Product.findAll({
          where: { id: products.map(p => p.productId) }
        });
        
        await order.addProducts(productInstances, { through: { quantity: products.quantity } });
      }

      res.status(201).json({ message: 'Order created', order });
    } catch (error) {
      res.status(400).json({ error: 'Order creation failed', details: error.message });
    }
  }

  // Listar todos os pedidos
  async list(req, res) {
    try {
      const orders = await Order.findAll({
        include: [
          { model: Client, as: 'client' },
          { model: Product, as: 'products' }
        ]
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ error: 'Failed to list orders', details: error.message });
    }
  }

  // Atualizar um pedido
  async update(req, res) {
    const { id } = req.params;
    const { status, totalAmount, products } = req.body;

    try {
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.status = status || order.status;
      order.totalAmount = totalAmount || order.totalAmount;

      await order.save();

      if (products && products.length > 0) {
        const productInstances = await Product.findAll({
          where: { id: products.map(p => p.productId) }
        });

        await order.setProducts(productInstances, { through: { quantity: products.quantity } });
      }

      res.status(200).json({ message: 'Order updated', order });
    } catch (error) {
      res.status(400).json({ error: 'Order update failed', details: error.message });
    }
  }

  // Deletar um pedido
  async delete(req, res) {
    const { id } = req.params;

    try {
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      await order.destroy();
      res.status(200).json({ message: 'Order deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Order deletion failed', details: error.message });
    }
  }
}

module.exports = new OrderController();
