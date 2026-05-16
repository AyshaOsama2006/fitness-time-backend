const db = require('../models');
const Product = db.Product;

async function createProduct(req, res) {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image || null;

    const product = await Product.create({
      name: req.body.name,
      category: req.body.category || 'Equipment',
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      image: imagePath
    });

    res.status(201).json(product);

  } catch (err) {
    if (
      err.name === 'SequelizeForeignKeyConstraintError' ||
      err?.parent?.code === 'ER_ROW_IS_REFERENCED_2'
    ) {
      return res.status(400).json({
        message: 'Cannot delete product with existing orders.'
      });
    }

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

    const updates = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock
    };

    if (req.body.category !== undefined) {
      updates.category = req.body.category;
    }

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      updates.image = req.body.image;
    }

    await product.update(updates);

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