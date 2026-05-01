const { Product } = require('../models');

// CREATE product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, stock, image } = req.body;

        const product = await Product.create({
            name,
            price,
            description,
            stock,
            image
        });

        res.status(201).json({
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating product',
            error: error.message
        });
    }
};

// READ all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// READ one product by id
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching product',
            error: error.message
        });
    }
};

// UPDATE product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, stock, image } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await product.update({
            name,
            price,
            description,
            stock,
            image
        });

        res.status(200).json({
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        await product.destroy();

        res.status(200).json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
};