const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, orderController.createOrder);
router.get('/me', authMiddleware, orderController.getUserOrders);
router.get('/', authMiddleware, orderController.getAllOrders);

module.exports = router;
