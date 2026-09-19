const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const user_model = require("../../models/user/user.model")

const user_signin_controller = async (req, res, next) => {
    try {
        const signed_user = await user_model.findOne({ email: req.body?.email })
        if (!signed_user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
                action_required: "Create an account and then signin"
            })
        }
        const is_valid_password = await bcrypt.compare(req.body.password, signed_user.password)
        if (!is_valid_password) {
            return res.status(403).json({
                success: false,
                message: "Incorrect password are entered"
            })
        }
        const cookieToken = jwt.sign({ id: signed_user._id, email: signed_user.email }, process.env.TOKENKEYSECRET)
        await signed_user.updateOne({
            $set: {
                last_login_at: Date()
            }
        })
        signed_user.save()
        res.cookie("cookieToken", cookieToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })
        return res.status(200).json({ 
            success: false, 
            message: "User logged successfully", 
            action_required: null 
        })
    } catch (error) {
        next(error)
    }
}

module.exports = user_signin_controller