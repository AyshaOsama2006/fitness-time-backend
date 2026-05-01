const { Cart, Product, Contains } = require('../models');

// CREATE cart
exports.createCart = async (req, res) => {
    try {
        const { User_id, status } = req.body;

        const cart = await Cart.create({
            User_id,
            status: status || 'active'
        });

        res.status(201).json({
            message: 'Cart created successfully',
            cart
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating cart',
            error: error.message
        });
    }
};

// GET cart with products
exports.getCartById = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.findByPk(id, {
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
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching cart',
            error: error.message
        });
    }
};

// ADD product to cart
exports.addProductToCart = async (req, res) => {
    try {
        const { Cart_id, product_id, quantity } = req.body;

        const cart = await Cart.findByPk(Cart_id);
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        const product = await Product.findByPk(product_id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const existingItem = await Contains.findOne({
            where: {
                Cart_id,
                product_id
            }
        });

        if (existingItem) {
            existingItem.quantity += quantity || 1;
            existingItem.price_at_time = product.price;
            await existingItem.save();

            return res.status(200).json({
                message: 'Product quantity updated in cart',
                item: existingItem
            });
        }

        const item = await Contains.create({
            Cart_id,
            product_id,
            quantity: quantity || 1,
            price_at_time: product.price
        });

        res.status(201).json({
            message: 'Product added to cart',
            item
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding product to cart',
            error: error.message
        });
    }
};

// UPDATE quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { Cart_id, product_id } = req.params;
        const { quantity } = req.body;

        const item = await Contains.findOne({
            where: {
                Cart_id,
                product_id
            }
        });

        if (!item) {
            return res.status(404).json({
                message: 'Cart item not found'
            });
        }

        await item.update({
            quantity
        });

        res.status(200).json({
            message: 'Cart item updated successfully',
            item
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating cart item',
            error: error.message
        });
    }
};

// REMOVE product from cart
exports.removeProductFromCart = async (req, res) => {
    try {
        const { Cart_id, product_id } = req.params;

        const item = await Contains.findOne({
            where: {
                Cart_id,
                product_id
            }
        });

        if (!item) {
            return res.status(404).json({
                message: 'Cart item not found'
            });
        }

        await item.destroy();

        res.status(200).json({
            message: 'Product removed from cart'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error removing product from cart',
            error: error.message
        });
    }
};

// DELETE whole cart
exports.deleteCart = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.findByPk(id);

        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            });
        }

        await cart.destroy();

        res.status(200).json({
            message: 'Cart deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting cart',
            error: error.message
        });
    }
};