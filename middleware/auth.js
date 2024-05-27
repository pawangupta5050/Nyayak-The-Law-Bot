const { validateUserToken } = require("../service/auth");

const checkAuthenticationCookie = (cookieName) => {
    return (req, res, next) => {
        const tokenCookie = req.cookies[cookieName];
        try {
            if (!tokenCookie) return next();

            const userPayload = validateUserToken(tokenCookie)
            req.user = userPayload;

        } catch (error) {
            res.status(401).json({ message: 'unathorized user' })
        }
        return next();
    }
}

const restrictTo = () => {
    return (req, res, next) => {
        if (!req.user) return res.redirect('/user/signin');
        return next();
    }
}

module.exports = {
    checkAuthenticationCookie,
    restrictTo
}