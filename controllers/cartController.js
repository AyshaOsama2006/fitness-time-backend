const db = require('../models');
const Cart = db.Cart;
const Product = db.Product;
const Contains = db.Contains;

async function createCart(req, res) {
  try {

    const cart = await Cart.create({
      User_id: req.body.User_id,
      status: req.body.status || 'active'
    });

    res.status(201).json(cart);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function getCartById(req, res) {
  try {

    const cart = await Cart.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: {
            attributes: ['quantity', 'price_at_time']
          }
        }
      ]
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function addProductToCart(req, res) {
  try {

    const cart = await Cart.findByPk(req.body.Cart_id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = await Product.findByPk(req.body.product_id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = await Contains.findOne({
      where: {
        Cart_id: req.body.Cart_id,
        product_id: req.body.product_id
      }
    });

    if (existingItem) {
      existingItem.quantity += req.body.quantity || 1;
      existingItem.price_at_time = product.price;

      await existingItem.save();

      return res.json(existingItem);
    }

    const item = await Contains.create({
      Cart_id: req.body.Cart_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity || 1,
      price_at_time: product.price
    });

    res.status(201).json(item);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function updateCartItem(req, res) {
  try {

    const item = await Contains.findOne({
      where: {
        Cart_id: req.params.Cart_id,
        product_id: req.params.product_id
      }
    });

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await item.update({
      quantity: req.body.quantity
    });

    res.json(item);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function removeProductFromCart(req, res) {
  try {

    const item = await Contains.findOne({
      where: {
        Cart_id: req.params.Cart_id,
        product_id: req.params.product_id
      }
    });

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await item.destroy();

    res.json({ message: 'Product removed from cart' });

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function deleteCart(req, res) {
  try {

    const cart = await Cart.findByPk(req.params.id);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    await cart.destroy();

    res.json({ message: 'Cart deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
  updateCartItem,
  removeProductFromCart,
  deleteCart
};