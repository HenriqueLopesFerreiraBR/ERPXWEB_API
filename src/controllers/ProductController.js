const Product = require('../models/Product');

class ProductController {
  // Criar um produto
  async create(req, res) {
    const { name, description, price, stock } = req.body;

    try {
      const product = await Product.create({ name, description, price, stock });
      res.status(201).json({ message: 'Product created', product });
    } catch (error) {
      res.status(400).json({ error: 'Product creation failed', details: error.message });
    }
  }

  // Listar todos os produtos
  async list(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ error: 'Failed to list products', details: error.message });
    }
  }

  // Atualizar um produto
  async update(req, res) {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.stock = stock || product.stock;

      await product.save();
      res.status(200).json({ message: 'Product updated', product });
    } catch (error) {
      res.status(400).json({ error: 'Product update failed', details: error.message });
    }
  }

  // Deletar um produto
  async delete(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      await product.destroy();
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Product deletion failed', details: error.message });
    }
  }
}

module.exports = new ProductController();
