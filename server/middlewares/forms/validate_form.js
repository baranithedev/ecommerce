const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const safe_string = (val) => (typeof val === 'string' ? val : '')

const validate_form = (req, res, next) => {
    const path = req.path.replace(/\/+$/, '')
    const body = req.body || {}
    const errors = {}
    if (path === '/signup') {
        const username = safe_string(body.username).trim()
        const email = safe_string(body.email).trim()
        const password = safe_string(body.password)
        const confirmPassword = safe_string(body.confirm_password)
        const terms = body.terms

        if (!username) errors.username = 'Username is required'
        else if (username.length < 2) errors.username = 'Username must be at least 2 characters'

        if (!email) errors.email = 'Email is required'
        else if (!EMAIL_REGEX.test(email)) errors.email = 'Email is invalid'

        if (!password) errors.password = 'Password is required'
        else if (password.length < 8) errors.password = 'Password must be at least 8 characters'

        if (!confirmPassword) errors.confirm_password = 'Confirm password is required'
        else if (password && password !== confirmPassword) errors.confirm_password = 'Passwords do not match'

        if (!terms || terms === 'false') errors.terms = 'You must agree to the terms and conditions'
    }
    else if (path === '/signin' || path === '/login') {
        const identifier = safe_string(body.email || body.username).trim()
        const password = safe_string(body.password)

        if (!identifier) errors.identifier = 'Email or username is required'

        if (!password) errors.password = 'Password is required'
    }
    else {
        return next()
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors })
    }
    next()
}

module.exports = validate_form