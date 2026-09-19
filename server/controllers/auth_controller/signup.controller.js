const bcrypt = require('bcryptjs')

const user_model = require("../../models/user/user.model")

const user_signup_controller = async (req, res, next) => {
    try {
        const new_user = await user_model.findOne({ email: req.body?.email })
        if (!new_user) {
            const password_hash = await bcrypt.hash(req.body.password, await bcrypt.genSalt(12))
            await user_model.create({
                username: req.body?.username,
                email: req.body?.email,
                password: password_hash,
                role: req.body?.role
            })
            return res.status(201).json({ success: true, message: "Creating a user is successfull", action_required: "Please go to signin as user" })
        }
        return res.status(400).json({ success: true, message: "User is already exist", action_required: "Please go to signin as user" })
        
    } catch (error) {
        next(error)
    }
}

module.exports = user_signup_controller