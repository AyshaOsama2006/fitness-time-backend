const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.post('/', cartController.createCart);
router.get('/:id', cartController.getCartById);
router.post('/add-product', cartController.addProductToCart);
router.put('/:cartId/product/:productId', cartController.updateCartItem);
router.delete('/:cartId/product/:productId', cartController.removeProductFromCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;