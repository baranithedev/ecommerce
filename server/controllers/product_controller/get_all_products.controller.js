const product_model = require('../../models/product/product.model')

const get_all_products_controller = async (req, res, next) => {
    try {
        const products = await product_model.find({}).select(['-stock', '-review', '-description'])
        return res.status(200).json({ success: true, products })
    } catch (error) {
        next(error)
    }
}

module.exports = get_all_products_controller