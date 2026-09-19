const mongoose = require('mongoose')

const handshake_mongoose = async () => {
    try {
        console.log("Connecting to database...")
        await mongoose.connect(process.env.MONGO_URI, { family: 4 })
        console.log(`Status: ${mongoose.connection.db.namespace}`)
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = handshake_mongoose