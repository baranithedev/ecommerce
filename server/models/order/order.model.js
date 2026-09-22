const mongoose = require('mongoose')

const order_receipt_schema = mongoose.Schema({
    cart_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'cart_product._id',
        unique: true,
        required: true
    },
    order_items: {
        type: Array,
        required: true
    },
    shipping_address: {
        type: Object,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
    payment_method: {
        type: String,
        required: true
    },
    shipping_status: {
        type: String,
        default: 'In-StoreHub',
        required: true
    }
})

const order_schema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        unique: true,
        required: true
    },
    order_histories: [{
        order: order_receipt_schema,
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Cancelled'],
            default: 'Pending'
        }
    }]
})

const order_model = mongoose.model('order', order_schema)

module.exports = order_model