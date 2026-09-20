const user_model = require('../../models/user/user.model')
const delivery_address = require('../../models/user/delivery_address.model')

const fetch_user_addresses = async (req, res, next) => {
    try {
        const current_user = await user_model.findById(req.current_user.id)
        if (!current_user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        let addresses = await delivery_address.findOne({ user: current_user._id }).populate({
            path: 'user',
            select: 'usermail email phone'
        })
        if (!addresses) {
            addresses = await delivery_address.create({
                user: current_user._id,
                addresses: []
            })
        }
        return res.status(200).json({
            success: false,
            addresses
        })
    } catch (error) {
        next(error)
    }
}

module.exports = fetch_user_addresses