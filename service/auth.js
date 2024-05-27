const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

const createUserToken = (user) => {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    }
    
    const token = jwt.sign(payload, secretKey)
    return token;
}

const validateUserToken = (token) => {
    if(!token) return res.redirect('/')

    const payload = jwt.verify(token, secretKey)
    return payload;
}

module.exports = {
    createUserToken,
    validateUserToken,
}