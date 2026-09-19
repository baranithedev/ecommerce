const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ["GET", "POST", "PATACH", "PUT", "DELETE"]
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

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