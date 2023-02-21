const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");
const allroutes = require("./routes/allRoutes");

// const product = require("./routes/productRouteV2");
const app = express();

dotenv.config({ path: 'backend/.env' });


// dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// const user = require("./routes/userRoute");
// const product = require('./routes/productRoute');
// const order = require('./routes/orderRoute');
// const payment = require('./routes/paymentRoute');
console.log(process.env.MONGO_URI);
// app.use("/api/v1/", user);
// app.use("/api/v1/products", product);
// app.use('/api/v1', product);
// app.use('/api/v1', order);
// app.use('/api/v1', payment);
// app.use('/api/v1/restaurant', restaurant);
// app.use('/api/v1/category', category);
// app.use('/api/v1/menu', menu);
app.use('/api/v1', allroutes);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Server is Running! 🚀");
    });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;
