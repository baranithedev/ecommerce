const mongoose = require('mongoose')

const cart_schema = mongoose.Schema({
    cart_user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    }, 
    cart_products: [{
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1
        }
    }]
})

const cart_model = mongoose.model('cart', cart_schema)

module.exports = cart_model