const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dbConnection = require('./connection.js');
const chatRouter = require('./routes/chat.js');
const userRouter = require('./routes/user.js');
const Chat = require('./model/chat.js');
const { checkAuthenticationCookie, restrictTo } = require('./middleware/auth.js');
const app = express();
const PORT = process.env.PORT || 8000;

dbConnection().then(() => console.log('connection established')).catch((error) => console.log(error))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./view'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(checkAuthenticationCookie('token'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
    if(checkAuthenticationCookie('token')){
        const chats = await Chat.find({ askedBy : req.user?._id}).sort({ createdAt: -1 }).populate("askedBy");
        return res.render('home', {
            user: req.user,
            chats: chats,
        });
    }else {
        return res.render('home', {
            user: req.user,
            // chats: chats,
        });
    }
})

app.use('/user', userRouter)

app.use('/chat', restrictTo(), chatRouter)


app.listen(PORT, () => console.log('listening on port ' + PORT));