const Supplier = require('../models/Supplier');

class SupplierController {
  // Criar um fornecedor
  async create(req, res) {
    const { name, contactInfo } = req.body;

    try {
      const supplier = await Supplier.create({ name, contactInfo });
      res.status(201).json({ message: 'Supplier created', supplier });
    } catch (error) {
      res.status(400).json({ error: 'Supplier creation failed', details: error.message });
    }
  }

  // Listar todos os fornecedores
  async list(req, res) {
    try {
      const suppliers = await Supplier.findAll();
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(400).json({ error: 'Failed to list suppliers', details: error.message });
    }
  }

  // Atualizar um fornecedor
  async update(req, res) {
    const { id } = req.params;
    const { name, contactInfo } = req.body;

    try {
      const supplier = await Supplier.findByPk(id);

      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }

      supplier.name = name || supplier.name;
      supplier.contactInfo = contactInfo || supplier.contactInfo;
      await supplier.save();

      res.status(200).json({ message: 'Supplier updated', supplier });
    } catch (error) {
      res.status(400).json({ error: 'Supplier update failed', details: error.message });
    }
  }

  // Deletar um fornecedor
  async delete(req, res) {
    const { id } = req.params;

    try {
      const supplier = await Supplier.findByPk(id);

      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }

      await supplier.destroy();
      res.status(200).json({ message: 'Supplier deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Supplier deletion failed', details: error.message });
    }
  }
}

module.exports = new SupplierController();
