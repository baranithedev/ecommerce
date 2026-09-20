const cart_model = require('../../models/cart/cart.model')

const update_product_quantity = async (req, res, next) => {
    try {
        if (req.body.quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be atleast 1"
            })
        }
        const cart = await cart_model.findOne({ cart_user: req.current_user.id })
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" })
        }
        const item_index = cart.cart_products.findIndex((item) => item.product.toString() === req.params.product_id)
        if (item_index === -1) {
            return res.status(400).json({
                success: false,
                message: "Product not  in cart"
            })
        }
        cart.cart_products[item_index].quantity = req.body.quantity
        await cart.save()
        return res.status(200).json({ success: true, message: null, cart })
    } catch (error) {
        next(error)
    }
}

module.exports = update_product_quantity