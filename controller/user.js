const User = require('../model/user.js');
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const htmlFilePath = path.join(__dirname, '../public/emails/email.html');
let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.emailAddress,
        pass: process.env.emailPassword,
    },
});

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

const handleValidateUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.render('signup', {
                error: `The user with email id ${email} already exists`,
            });
        } else {
            const otp = generateOTP();
            htmlContent = htmlContent.replace('{{OTP}}', otp).replace('{{name}}', fullName);;
            transporter.sendMail({
                from: `"${process.env.name}" <${process.env.emailAddress}>`, // sender address
                to: email, // list of receivers
                subject: "Your OTP to validate your Email ID", // Subject line
                // text: "Hello world?", // plain text body
                html: htmlContent, // html body
            }, (error, info) => {
                if (error) {
                    return res.render('signup', {
                        error: "Error sending OTP",
                    });
                } else {
                    const otpToken = jwt.sign({ fullName, email, password, otp }, secretKey, { expiresIn: '1d' });

                    res.cookie('otpToken', otpToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Max age: 1 day

                    // console.log("Message sent: %s", info.messageId);
                    return res.render('emailVerification', {
                        email,
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error handling signup:', error);
        return res.status(500).send('Internal Server Error');
    }
}

const handleVerifyUser = (req, res) => {
    try {
        const token = req.cookies.otpToken;

        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.render('emailVerification', {
                    error: "Error sending OTP",
                });
            } else {
                const { fullName, email, password, otp } = decoded;

                const enteredOtp = `${req.body.one}${req.body.two}${req.body.three}${req.body.four}`
                console.log(otp)
                console.log(enteredOtp)
                // Verify OTP (example)
                if (enteredOtp == otp) {
                    await User.create({
                        fullName,
                        email,
                        password,
                    });
                    res.clearCookie('otpToken')
                    return res.redirect('signin');
                } else {
                    // Invalid OTP
                    return res.status(400).send('Invalid OTP');
                }
            }
        });
    } catch (error) {
        console.error('Error verifying user:', error);
        return res.status(500).send('Internal Server Error');
    }
}

// const handleSignupUser = async (req, res) => {
//     try {
//         const { fullName, email, password } = req.body;

//         const existingUser = await User.findOne({ email: email });

//         if (existingUser) {
//             return res.render('signup', {
//                 error: `The user with email id ${email} already exists`,
//             });
//         } else {
//             await User.create({
//                 fullName,
//                 email,
//                 password,
//             });
//             res.clearCookie('otp')
//             return res.redirect('/');
//         }
//     } catch (err) {
//         console.error('Error handling signup:', err);
//         return res.status(500).send('Internal Server Error');
//     }
// };

const handleSigninUser = async (req, res) => {
    const { email, password } = req.body;
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
    // handleSignupUser,
    handleSigninUser,
    handleLogoutUser,
    handleValidateUser,
    handleVerifyUser,
}