const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set('strictQuery', true)
const connectDatabase = () => {
    mongoose
        .connect('mongodb+srv://admin:flipcart$7@flipcart.6irf4r8.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
};

module.exports = connectDatabase;