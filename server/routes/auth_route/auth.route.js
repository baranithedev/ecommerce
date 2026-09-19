const auth_routes = require('express').Router()

const validate_form = require('../../middlewares/forms/validate_form')
const validate_user = require('../../middlewares/user/validate_user')


const signup_controller = require('../../controllers/auth_controller/signup.controller')
const signin_controller = require('../../controllers/auth_controller/signin.controller')
const signout_controller = require('../../controllers/auth_controller/signout.controller')

const forget_password_controller = require('../../controllers/auth_controller/forget_password.controller')


auth_routes.post('/signup', validate_form, signup_controller)
auth_routes.post('/signin', validate_form, signin_controller)
auth_routes.post('/logout', validate_user, signout_controller)

auth_routes.patch('/forget-password', forget_password_controller)


module.exports = auth_routes