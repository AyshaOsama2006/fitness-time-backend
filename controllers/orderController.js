const db = require('../models');
const Cart = db.Cart;
const Product = db.Product;
const Contains = db.Contains;
const Order = db.Order;
const OrderItem = db.OrderItem;

const loadActiveCart = async (userId) => {
  return Cart.findOne({
    where: { userId, status: 'active' },
    include: [
      {
        model: Product,
        as: 'products',
        through: { attributes: ['quantity', 'priceAtTime'] }
      }
    ]
  });
};

const buildOrderItems = (products) => {
  const items = [];
  let totalAmount = 0;

  for (const product of products) {
    const join = product.Contains || {};
    const quantity = join.quantity || 1;
    const priceAtTime = Number.isFinite(join.priceAtTime)
      ? join.priceAtTime
      : product.price;
    const lineTotal = quantity * priceAtTime;

    totalAmount += lineTotal;
    items.push({
      productId: product.id,
      quantity,
      priceAtTime,
      lineTotal
    });
  }

  return { items, totalAmount };
};

async function createOrder(req, res) {
  try {
    const { shippingName, shippingPhone, shippingAddress } = req.body;

    if (!shippingName || !shippingPhone || !shippingAddress) {
      return res.status(400).json({ message: 'Missing checkout fields' });
    }

    const cart = await loadActiveCart(req.user.id);

    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const { items, totalAmount } = buildOrderItems(cart.products);

    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      paymentMethod: 'cod',
      status: 'placed',
      shippingName,
      shippingPhone,
      shippingAddress
    });

    const orderItems = items.map((item) => ({
      ...item,
      orderId: order.id
    }));

    await OrderItem.bulkCreate(orderItems);

    await cart.update({ status: 'ordered' });

    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    });

    res.status(201).json(createdOrder);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function getUserOrders(req, res) {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function getAllOrders(req, res) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        },
        {
          model: db.User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'role']
        }
      ]
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders
};
