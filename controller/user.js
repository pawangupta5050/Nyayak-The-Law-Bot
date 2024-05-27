const User = require('../model/user.js')

const handleSignupUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.render('signup', {
                error: `The user with email id ${email} already exists`,
            });
        } else {
            await User.create({
                fullName,
                email,
                password,
            });
            
            return res.redirect('/');
        }
    } catch (err) {
        console.error('Error handling signup:', err);
        return res.status(500).send('Internal Server Error');
    }
};

const handleSigninUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect('/')
    } catch (error) {
        return res.render('signin', {
            error: "Incorrect Email or Password",
        });
    }
    
}

const handleLogoutUser = (req, res) => {
    return res.clearCookie('token').redirect('/');
}

module.exports = {
    handleSignupUser,
    handleSigninUser,
    handleLogoutUser,
}