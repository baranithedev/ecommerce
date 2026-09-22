const order_model = require('../../models/order/order.model')

const cart_product_checkout_controller = async (req, res, next) => {
    try {
        const order = await order_model.findOne({ user: req.current_user.id })
        if (!order) {
            return res.status(400).json({
                success: false,
                message: "Something wnet wrong"
            })
        }
        order.order_histories.push({ order: req.checkout_data })
        await order.save()
        await req.user_cart.save()
        return res.status(200).json({ success: true, order })
    } catch (error) {
        next(error)
    }
}

module.exports = cart_product_checkout_controller