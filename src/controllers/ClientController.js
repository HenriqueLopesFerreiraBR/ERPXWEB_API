const Client = require('../models/Client');

class ClientController {
  // Criar um cliente
  async create(req, res) {
    const { name, email, phone, address } = req.body;

    try {
      const client = await Client.create({ name, email, phone, address });
      res.status(201).json({ message: 'Client created', client });
    } catch (error) {
      res.status(400).json({ error: 'Client creation failed', details: error.message });
    }
  }

  // Listar todos os clientes
  async list(req, res) {
    try {
      const clients = await Client.findAll();
      res.status(200).json(clients);
    } catch (error) {
      res.status(400).json({ error: 'Failed to list clients', details: error.message });
    }
  }

  // Atualizar um cliente
  async update(req, res) {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    try {
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      client.name = name || client.name;
      client.email = email || client.email;
      client.phone = phone || client.phone;
      client.address = address || client.address;

      await client.save();
      res.status(200).json({ message: 'Client updated', client });
    } catch (error) {
      res.status(400).json({ error: 'Client update failed', details: error.message });
    }
  }

  // Deletar um cliente
  async delete(req, res) {
    const { id } = req.params;

    try {
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ message: 'Client not found' });
      }

      await client.destroy();
      res.status(200).json({ message: 'Client deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Client deletion failed', details: error.message });
    }
  }
}

module.exports = new ClientController();
