const user_model = require("../../models/user/user.model")

const current_user_controller = async (req, res, next) => {
    try {
        const current_user = await user_model.findOne({ _id: req.current_user.id, email: req.current_user.email }).select('-password')
        if (!current_user) {
            return res.status(400).json({
                success: false,
                message: "This user is no longer available",
                action_required: "Create an account and then signin"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User is authorized",
            current_user
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = current_user_controller