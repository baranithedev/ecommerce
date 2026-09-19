const user_model = require("../../models/user/user.model")

const forget_password = async (req, res, next) => {
    try {
        const user = await user_model.findOne({ email: req.body.email }).select(['-password'])
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Unable to find the user",
                action_required: null
            })
        }
        return res.status(200).json({
            success: true,
            message: `Forget password link sent to this ${user.email} email`,
            action_required: null
        })  
    } catch (error) {
        next(error)  
    }
}

module.exports = forget_password