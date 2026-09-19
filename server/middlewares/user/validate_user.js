const jwt = require('jsonwebtoken')

const validate_user = (req, res, next) => {
    const cookie_token = req.cookies['cookieToken']
    if (!cookie_token) {
        return res.status(403).json({ success: false, message: "Authorization is required", action_required: "Please sign-in using credentials" })
    }
    const current_user = jwt.verify(cookie_token, process.env.TOKENKEYSECRET)
    req.current_user = current_user
    next()
}

module.exports = validate_user