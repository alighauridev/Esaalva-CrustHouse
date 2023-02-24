const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodPointSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gpsCoordinates: [{ type: String }],
    services: [{ type: String, required: true }],
    menu: { type: Schema.Types.ObjectId, ref: "Menu" },
    owner: { type: String, required: true },
    specialItems: [{ type: String }],
    // paymentPolicy: { type: String },
    // paymentOptions: [{ type: String }],
});

const FoodPoint = mongoose.model("FoodPoint", foodPointSchema);

module.exports = FoodPoint;
