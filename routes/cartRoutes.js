const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.post('/', cartController.createCart);
router.get('/:id', cartController.getCartById);
router.post('/add-product', cartController.addProductToCart);
router.put('/:Cart_id/product/:product_id', cartController.updateCartItem);
router.delete('/:Cart_id/product/:product_id', cartController.removeProductFromCart);
router.delete('/:id', cartController.deleteCart);

module.exports = router;