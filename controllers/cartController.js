const db = require('../models');
const Cart = db.Cart;
const Product = db.Product;
const Contains = db.Contains;

const getOrCreateActiveCart = async (userId) => {
  let cart = await Cart.findOne({
    where: { userId, status: 'active' }
  });

  if (!cart) {
    cart = await Cart.create({ userId, status: 'active' });
  }

  return cart;
};

async function getActiveCart(req, res) {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.user.id, status: 'active' },
      include: [
        {
          model: Product,
          as: 'products',
          through: { attributes: ['quantity', 'priceAtTime'] }
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

async function addProductToActiveCart(req, res) {
  try {
    const cart = await getOrCreateActiveCart(req.user.id);

    const product = await Product.findByPk(req.body.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = await Contains.findOne({
      where: {
        cartId: cart.id,
        productId: req.body.productId
      }
    });

    if (existingItem) {
      existingItem.quantity += req.body.quantity || 1;
      existingItem.priceAtTime = product.price;
      await existingItem.save();
      return res.json(existingItem);
    }

    const item = await Contains.create({
      cartId: cart.id,
      productId: req.body.productId,
      quantity: req.body.quantity || 1,
      priceAtTime: product.price
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function updateActiveCartItem(req, res) {
  try {
    const cart = await getOrCreateActiveCart(req.user.id);
    const item = await Contains.findOne({
      where: {
        cartId: cart.id,
        productId: req.params.productId
      }
    });

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await item.update({ quantity: req.body.quantity });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function removeProductFromActiveCart(req, res) {
  try {
    const cart = await getOrCreateActiveCart(req.user.id);
    const item = await Contains.findOne({
      where: {
        cartId: cart.id,
        productId: req.params.productId
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

module.exports = {
  getActiveCart,
  addProductToActiveCart,
  updateActiveCartItem,
  removeProductFromActiveCart
};