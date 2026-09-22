const mongoose = require('mongoose')

const delivery_address_schema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        unique: true,
        required: true,
    },
    addresses: {
        type: [{
            door_no: {
                type: mongoose.SchemaTypes.String,
                trim: true,
                required: true
            },
            address_line: {
                type: mongoose.SchemaTypes.String,
                trim: true,
                required: true
            },
            area: {
                type: mongoose.SchemaTypes.String,
                trim: true,
                required: true
            },
            district: {
                type: mongoose.SchemaTypes.String,
                trim: true,
                required: true
            },
            state: {
                type: mongoose.SchemaTypes.String,
                trim: true,
                required: true
            },
            pincode: {
                type: mongoose.SchemaTypes.String,
                trim: true,
                required: true
            },
            is_default: {
                type: mongoose.SchemaTypes.Boolean,
                default: false
            }
        }],
        validate: [
            (val) => {
                return !(val.length > 3)
            },
            "Address limit exceed: you can only store upto 3 addresses"
        ]
    }
}, { timestamps: true })

const delivery_address_model = mongoose.model('delivery_address', delivery_address_schema)

module.exports = delivery_address_model