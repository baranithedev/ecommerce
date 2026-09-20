const user_routes = require('express').Router()

const validate_user = require('../../middlewares/user/validate_user')

const current_user_controller = require('../../controllers/user_controller/current_user.controller')
const fetch_user_addresses = require('../../controllers/user_controller/fetch_user_addresses.controller')

const profile_update_controller = require('../../models/user/profile_update.controller')
const reset_password_controller = require('../../controllers/user_controller/reset_password.controller')

user_routes.get('/current', validate_user, current_user_controller)
user_routes.get('/delivery-address', validate_user, fetch_user_addresses)

user_routes.patch('/profile-update', validate_user, profile_update_controller)
user_routes.patch('/reset-password', validate_user, reset_password_controller)

module.exports = user_routes