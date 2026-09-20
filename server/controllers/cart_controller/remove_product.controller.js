const cart_model = require('../../models/cart/cart.model')

const remove_product = async (req, res, next) => {
    try {
        const cart = await cart_model.findOneAndUpdate({ cart_user: req.current_user.id }, {
            $pull: {
                cart_products: { _id: req.params.product_id }
            }
        }, { $new: true })
        if (!cart.cart_products.find((product) => product._id.toString()===req.params.product_id)) {
            return res.status(404).json({
                success: false,
                message: "Product was not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Product was removed"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = remove_product