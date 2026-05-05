const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.loginUser);
router.post('/', userController.createUser);

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;