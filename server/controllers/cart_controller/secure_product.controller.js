const cart_model = require('../../models/cart/cart.model')

const secure_product = async (req, res, next) => {
    try {
        let cart = await cart_model.findOne({ cart_user: req.current_user.id })
        if (!cart) {
            cart = await cart_model.create({
                cart_user: req.current_user.id,
                cart_product: [{ product: req.body.product_id, quantity: 1 }]
            })
        }
        const item_index = cart.cart_products.findIndex((item) => item.product.toString()===req.body.product_id)
        if (item_index > -1) {
            cart.cart_products[item_index].quantity += Number(req.body.quantity)
        } else {
            cart.cart_products.push({ product: req.body.product_id, quantity: req.body.quantity })
        }
        await cart.save()
        await cart.populate({
            path: 'cart_products.product',
            select: 'name price image stock'
        })
        return res.status(200).json({ success: false, message: "Product updated", cart })
    } catch (error) {
        next(error)
    }
}

module.exports = secure_product