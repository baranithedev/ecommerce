const order_route = require('express').Router()

const validate_user = require('../../middlewares/user/validate_user')

const fetch_order_controller = require('../../controllers/order_controller/fetch_order.controller')

order_route.get('/', validate_user, fetch_order_controller)

module.exports = order_route