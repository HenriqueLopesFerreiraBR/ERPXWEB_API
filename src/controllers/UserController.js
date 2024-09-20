const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User');

const SECRET_KEY = 'your-secret-key';

class UserController {
  async register(req, res) {
    const { username, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      res.status(400).json({ error: 'User creation failed' });
    }
  }

  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: '1h',
      });

      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error: 'Login failed' });
    }
  }

  async update(req, res) {
    const { newPassword } = req.body;

    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      res.status(200).json({ message: 'Password updated' });
    } catch (error) {
      res.status(400).json({ error: 'Update failed' });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      res.status(400).json({ error: 'Delete failed' });
    }
  }
}

module.exports = new UserController();
