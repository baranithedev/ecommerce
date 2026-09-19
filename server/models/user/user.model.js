const mongoose = require('mongoose')

const user_schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        default: null
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'customer',
        enum: ['customer', 'admin']
    },
    is_verified_email: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: false
    },
    last_login_at: {
        type: Date,
        default: null
    },
}, { timestamps: true })

const user_model = mongoose.model('user', user_schema)

module.exports = user_model