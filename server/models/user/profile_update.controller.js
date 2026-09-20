const bcrypt = require('bcryptjs')

const user_model = require("./user.model")

const profile_update_controller = async (req, res, next) => {
    try {
        const user = await user_model.findOne({ _id: req.current_user.id })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const whitelist_fields = ['username', 'phone', 'password', 'new_password']
        const updates = {}
        for (key of whitelist_fields) {
            if (req.body[key] !== undefined) {
                const new_password_hash = await bcrypt.hash(req.body[key], await bcrypt.genSalt(12))
                updates[key === 'new_password'? 'password': key] = key === 'new_password'? new_password_hash: req.body[key]
            }
        }
        const is_valid_password = await bcrypt.compare(req.body.password, user.password)
        if(!is_valid_password) {
            return res.status(400).json({
                success: false,
                mssage: "Incorrect password"
            })
        }
        await user_model.findOneAndUpdate({ _id: req.current_user.id }, {
            $set: { ...updates }
        }, { $new: true, runValidation: true }).select(['-password'])
        return res.status(200).json({
            success: true,
            message: "User profile was updated"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = profile_update_controller