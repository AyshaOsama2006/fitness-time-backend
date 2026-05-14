const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/active/me', authMiddleware, cartController.getActiveCart);
router.post('/items', authMiddleware, cartController.addProductToActiveCart);
router.put('/items/:productId', authMiddleware, cartController.updateActiveCartItem);
router.delete('/items/:productId', authMiddleware, cartController.removeProductFromActiveCart);

router.post('/', cartController.createCart);
router.get('/:id', cartController.getCartById);
router.post('/add-product', cartController.addProductToCart);
router.put('/:cartId/product/:productId', cartController.updateCartItem);
router.delete('/:cartId/product/:productId', cartController.removeProductFromCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;