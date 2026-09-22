const order_model = require('../../models/order/order.model')

const fetch_order_controller = async (req, res, next) => {
    try {
        let user_orders = await order_model.findOne({ user: req.current_user.id })
        if (!user_orders) {
            user_orders = await order_model.create({
                user: req.current_user.id,
                order_histories: []
            })
        }
        return res.status(200).json({
            success: true,
            orders: user_orders
        })
    } catch (error) {
        next(error)
    }
}

module.exports = fetch_order_controller