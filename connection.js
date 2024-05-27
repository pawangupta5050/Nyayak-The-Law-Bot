const mongoose = require('mongoose')

const dbConnection = async () => {
    return mongoose.connect(process.env.MONGO_URL);
}

module.exports = dbConnection