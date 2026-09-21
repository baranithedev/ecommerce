const cart_routes = require('express').Router()

const validate_user = require('../../middlewares/user/validate_user')

const fetch_cart_items_controller = require('../../controllers/cart_controller/fetch_cart_items.controller')
const secure_product = require('../../controllers/cart_controller/secure_product.controller')
const update_product_quantity = require('../../controllers/cart_controller/update_product_quantity.controller')
const remove_product = require('../../controllers/cart_controller/remove_product.controller')
const cart_product_checkout_controller = require('../../controllers/cart_controller/cart_product_checkout.controller')

cart_routes.get('/', validate_user, fetch_cart_items_controller)
cart_routes.post('/secure', validate_user, secure_product)
cart_routes.patch('/update/:product_id', validate_user, update_product_quantity)
cart_routes.delete('/delete/:product_id', validate_user, remove_product)

cart_routes.post('/checkout-cart', validate_user, cart_product_checkout_controller)

module.exports = cart_routes