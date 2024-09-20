const express = require('express');
const UserController = require('../controllers/UserController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.put('/update',  UserController.update);
router.delete('/delete',  UserController.delete);

module.exports = router;
