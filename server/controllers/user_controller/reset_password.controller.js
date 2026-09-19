const bcrypt = require('bcryptjs')

const user_model = require("../../models/user/user.model")

const reset_password = async (req, res, next) => {
    try {
        const user = await user_model.findOne({ _id: req.current_user.id, email: req.current_user.email })
        const is_valid_password = await bcrypt.compare(req.body.password, user.password)
        if (!is_valid_password) {
            return res.status(403).json({
                success: false,
                message: "Invalid password entered"
            })
        }
        const updated_password_hash = await bcrypt.hash(req.body.new_password, await bcrypt.genSalt(12))
        await user.updateOne({
            $set: { password: updated_password_hash }
        })
        user.save()
        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        next(error)  
    }
}

module.exports = reset_password