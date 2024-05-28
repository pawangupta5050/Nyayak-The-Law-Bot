const { Router } = require('express');
const { handleSigninUser, handleLogoutUser, handleValidateUser, handleVerifyUser } = require('../controller/user');
const router = Router();

const { restrictTo } = require('../middleware/auth.js');

router.get('/signin', (req, res) => {
    return res.render('signin')
});

router.get('/signup', (req, res) => {
    return res.render('signup')
});

router.get('/logout', handleLogoutUser);

router.post('/signup', handleValidateUser);

router.post('/verify', handleVerifyUser);

router.post('/signin', handleSigninUser);

module.exports = router;