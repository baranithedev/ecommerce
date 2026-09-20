const mongoose = require('mongoose')

const review_schema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true,
    },
    content: {
        type: String,
        trim: true,
        min: 10,
        max: 1000,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0,
        required: true
    },
    post_at: {
        type: Date,
        default: Date.now
    }
})

const product_schema = mongoose.Schema({
    image: {
        type: String,
        required: false,
        trim: true,
        default: null
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: false
    },
    price: {
        new: {
            type: Number,
            default: 0,
            required: true
        },
        old: {
            type: Number,
            default: 0,
            required: true
        }
    },
    review: [review_schema],
    tags: {
        type: Array,
        default: [],
        required: false
    },
    stock: {
        type: Number,
        min: 0,
        default: 0,
        required: true
    },
    sku: {
        type: String,
        trim: true,
        uppercase: true,
        unique: true,
        min: 6,
        max: 16,
        required: true
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    }
}, { timestamps: true })

const product_model = mongoose.model('product', product_schema)

module.exports = product_model