const db = require('../models');
const Product = db.Product;

async function createProduct(req, res) {
  try {

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      image: req.body.image
    });

    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function getAllProducts(req, res) {
  try {

    const products = await Product.findAll();

    res.json(products);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function getProductById(req, res) {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function updateProduct(req, res) {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      image: req.body.image
    });

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

async function deleteProduct(req, res) {
  try {

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();

    res.json({ message: 'Product deleted successfully' });

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};