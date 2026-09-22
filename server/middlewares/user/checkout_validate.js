const cart_model = require('../../models/cart/cart.model')
const shipping_address_model = require('../../models/user/shipping_address.model')
const product_model = require('../../models/product/product.model')

const checkout_validate = async (req, res, next) => {
    try {
        const errors = {}
        const allowed_payment_methods = ['CASH', 'CARD', 'UPI']
        const { payment_method, shipping_address_id } = req.body

        if (!payment_method) {
            errors.payment_method = 'Payment method is required'
        } else if (!allowed_payment_methods.includes(payment_method)) {
            errors.payment_method = `Invalid payment method. Allowed: ${allowed_payment_methods.join(', ')}`
        }

        const user_addresses = await shipping_address_model.findOne({ user: req.current_user.id }).select(['-user'])

        if (user_addresses?.addresses.length === 0) {
            errors.shipping_address = 'At least one shipping address is required on your profile'
        } else if (shipping_address_id) {
            const selected = user_addresses?.addresses.find((addr) => addr._id.toString() === shipping_address_id)
            if (!selected) errors.shipping_address_id = 'Selected shipping address is invalid or does not exist'
        }

        const user_cart = await cart_model.findOne({ user: req.current_user.id }).select(['-user']).populate({
            path: 'cart_products.product',
            select: 'image name quantity price.new stock'
        })
        if (user_cart?.cart_products.length === 0) {
            errors.cart = 'Your cart is empty'
        } else {
            const item_errors = []
            const order_items = []

            for (const item of user_cart?.cart_products) {
                if (!item || !item.product) {
                    item_errors.push({
                        item_id: item?._id,
                        message: 'Product is no longer available'
                    })
                    continue
                }

                if (item.quantity <= 0) {
                    item_errors.push({
                        product_id: item.product._id,
                        name: item.product.name,
                        message: 'Item quantity must be greater than 0'
                    })
                    continue
                }

                if (item.product.stock < item.quantity) {
                     item_errors.push({
                        product_id: item.product._id,
                        name: item.product.name,
                        stock: item.product.stock, 
                        requested: item.quantity,
                        message: `Insufficient stock for "${item.product.name}". Available: ${item.product.stock}`
                    })

                    continue
                }
                const updated = await product_model.findOneAndUpdate(
                    { _id: item.product._id, stock: { $gte: item.quantity } },
                    { $inc: { stock: -item.quantity } },
                )
                if (!updated) {
                    return res.status(400).json({
                        success: false,
                        message: "Something went wrong"
                    })
                }
                order_items.push({
                    product_id: item.product._id,
                    product_name: item.product.name,
                    product_quantity: item.quantity,
                    product_unit_price: item.product.price.new,
                    product_total_amount: item.quantity * item.product.price.new,
                    product_cart_id: item._id
                })
            }

            if (item_errors.length > 0) {
                errors.items = item_errors
            } else {

                req.checkout_data = {
                    cart_id: user_cart._id,
                    order_items,
                    shipping_address: user_addresses?.addresses.find((address) => address._id.toString() === shipping_address_id),
                    total_amount: order_items.reduce((final_payout, product) => final_payout +=product.product_total_amount, 0),
                    payment_method: req.body.payment_method,
                    shipping_status: "In-Storehub"
                }
                user_cart.cart_products = []
                req.user_cart = user_cart
            }
        }
        if (Object.keys(errors).length > 0) {
            return res.status(422).json({
                success: false,
                message: 'Checkout validation failed',
                errors
            })
        }
        return next()
    } catch (error) {
        return next(error)
    }
}

module.exports = checkout_validate