const addresses_model = require('../../models/user/delivery_address.model')
const cart_model = require('../../models/cart/cart.model')
const product_model = require('../../models/product/product.model')

const cart_product_checkout_controller = async (req, res, next) => {
    try {
        const user_shipping_addresses = await addresses_model.findOne({ user: req.current_user.id }).select(['-user'])
        if (user_shipping_addresses.addresses.length < 1) {
            return res.status(400).json({
                success: false,
                message: "Atleast one shipping address is required",
                action_required: "Update your delivery address"
            })
        }
        const user_cart = await cart_model.findOne({ cart_user: req.current_user.id }).select(['-cart_user']).populate({
            path: 'cart_products.product',
            select: 'image name quantity price.new stock'
        })
        if (!user_cart || user_cart.cart_products.length < 1) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty",
                action_required: null
            })
        }
        const order_items = []
        for (const cart_products of user_cart.cart_products) {
            if (!cart_products) {
                return res.status(404),json({
                    success: false,
                    message: "Product was unavailable"
                })
            }
            if (cart_products.product.stock < cart_products.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insuffient stock \'${cart_products.product.name}\!. Please let's update your product quantity. Current product stock is ${cart_products.product.stock}'`
                })
            }
            order_items.push({
                product_id: cart_products.product.id,   
                product_name: cart_products.product.name,
                product_quantity: cart_products.quantity,
                product_unit_price: cart_products.product.price.new,
                product_total_amount: cart_products.quantity * cart_products.product.price.new,
                product_cart_id: cart_products._id
            })
        }
        if (!req.body.payment_method) {
            return res.status(400).json({
                success: false,
                message: "Please the order payment method"
            })
        }
        for (item of order_items) {
            const stock_update_product = await product_model.findOneAndUpdate(
                { _id: item.product_id , stock: { $gte: item.product_quantity }},
                { $inc: { stock: -item.product_quantity }}
            )
            if (!stock_update_product) {
                return res.status(400).json({
                    success: false,
                    message: `${item.product_name} is not available`,
                    action_required: "Remove the item or move to wishlist"
                })
            }
        }
        const order = {
            user_id: req.current_user.id,
            items: order_items,
            total_amount: order_items.reduce((total_amount, product) => product.product_total_amount + total_amount, 0),
            shipping_address: user_shipping_addresses,
            payment_method: req.body.payment_method,
            order_status: 'ongoing',
            shipping_status: 'in-<storehub>'
        }
        user_cart.cart_products = []
        await user_cart.save()
        return res.status(200).json({ success: true, order })
    } catch (error) {
        next(error)
    }
}

module.exports = cart_product_checkout_controller