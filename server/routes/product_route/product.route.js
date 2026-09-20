const product_routes = require('express').Router()

const validate_user = require('../../middlewares/user/validate_user')

const get_all_products_controller = require('../../controllers/product_controller/get_all_products.controller')
const get_product_by_slug_controller = require('../../controllers/product_controller/get_product_by_slug.controller')


product_routes.get('/', get_all_products_controller)

product_routes.get('/:slug', validate_user, get_product_by_slug_controller)

module.exports = product_routes