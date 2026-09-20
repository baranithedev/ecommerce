const cart_model = require('../../models/cart/cart.model')

const fetch_cart_items_controller = async (req, res, next) => {
    try {
        const cart = await cart_model.findOne({ cart_user: req.current_user.id }).populate({
            path: 'cart_products.product',
            select: 'name price image stock'
        })
        if (!cart) {
            await cart_model.create({
                cart_user: req.current_user.id,
                cart_product: []
            })
        }
        return res.status(200).json({
            success: true,
            message: "Cart was fetched",
            cart
        })
    } catch (error) {
        next(error)
    }
}

module.exports = fetch_cart_items_controller