const Manufacturer = require('../models/Manufacturer');

class ManufacturerController {
  // Criar um fabricante
  async create(req, res) {
    const { name, country, website } = req.body;

    try {
      const manufacturer = await Manufacturer.create({ name, country, website });
      res.status(201).json({ message: 'Manufacturer created', manufacturer });
    } catch (error) {
      res.status(400).json({ error: 'Manufacturer creation failed', details: error.message });
    }
  }

  // Listar todos os fabricantes
  async list(req, res) {
    try {
      const manufacturers = await Manufacturer.findAll();
      res.status(200).json(manufacturers);
    } catch (error) {
      res.status(400).json({ error: 'Failed to list manufacturers', details: error.message });
    }
  }

  // Atualizar um fabricante
  async update(req, res) {
    const { id } = req.params;
    const { name, country, website } = req.body;

    try {
      const manufacturer = await Manufacturer.findByPk(id);

      if (!manufacturer) {
        return res.status(404).json({ message: 'Manufacturer not found' });
      }

      manufacturer.name = name || manufacturer.name;
      manufacturer.country = country || manufacturer.country;
      manufacturer.website = website || manufacturer.website;

      await manufacturer.save();
      res.status(200).json({ message: 'Manufacturer updated', manufacturer });
    } catch (error) {
      res.status(400).json({ error: 'Manufacturer update failed', details: error.message });
    }
  }

  // Deletar um fabricante
  async delete(req, res) {
    const { id } = req.params;

    try {
      const manufacturer = await Manufacturer.findByPk(id);

      if (!manufacturer) {
        return res.status(404).json({ message: 'Manufacturer not found' });
      }

      await manufacturer.destroy();
      res.status(200).json({ message: 'Manufacturer deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Manufacturer deletion failed', details: error.message });
    }
  }
}

module.exports = new ManufacturerController();
