const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const auth_routes = require('./routes/auth_route/auth.route')
const user_routes = require('./routes/user_route/user.route')
const product_routes = require('./routes/product_route/product.route')
const cart_routes = require('./routes/cart_route/cart.route')
const order_routes = require('./routes/order_route/order.route')

const app = express()

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "PATACH", "PUT", "DELETE"]
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", auth_routes)
app.use("/api/v1/user", user_routes)
app.use("/api/v1/products", product_routes)
app.use("/api/v1/cart", cart_routes)
app.use("/api/v1/order", order_routes)

app.get('/api/v1/test-server', (req, res) => {
    try {
        return re.status(200).json({
            success: true,
            message: "Server is working"
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: `Internal server error: ${error.message}`
        })
    }
})

module.exports = app