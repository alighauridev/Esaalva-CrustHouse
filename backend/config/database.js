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

// const connectDatabase = () => {
//     mongoose.connect('mongodb+srv://admin:flipcart$7@flipcart.6irf4r8.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

//     const db = mongoose.connection;

//     db.on('error', console.error.bind(console, 'connection error:'));
//     db.once('open', function () {
//         console.log("Connected to MongoDB!");

//         products.forEach((product) => {
//             const newProduct = new ProductTextModel(product);

//             newProduct.save((err, product) => {
//                 if (err) return console.error(err);
//                 console.log(`Product "${product.name}" has been saved to the database.`);
//             });
//         });
//     });
// };



module.exports = connectDatabase;