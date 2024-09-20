const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;  // Salva o usuário decodificado na requisição
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = { verifyToken };
