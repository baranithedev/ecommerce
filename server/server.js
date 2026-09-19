const app = require('./index')

const http = require('http')
const server = http.createServer(app)

const handshake_database = require('./configs/database')
const error_logger = require('./middlewares/error_handler/error_logger')

app.use(error_logger)

server.listen(process.env.PORT, async () => {
    await handshake_database()
    console.log(`Server is running on port: ${process.env.PORT}`)
})