const mongoose = require("mongoose")
const product_model = require("../../models/product/product.model")

const get_product_by_slug_controller = async (req, res, next) => {
    try {
        const product = await product_model.findOne({ slug: req.params.slug })
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Product fetched",
            product
        })
    } catch (error) {
        next(error)
    }
}

module.exports = get_product_by_slug_controller