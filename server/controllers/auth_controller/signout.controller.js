const signout_controller = (req, res, next) => {
    try {
        res.clearCookie("cookieToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = signout_controller