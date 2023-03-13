const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    foodPoint: {
        type: Schema.Types.ObjectId,
        ref: "FoodPoint",
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    menuTypes: [{ type: String, required: true }],
    // categories: [{ type: String, required: true }],
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: "MenuItem",
        },
    ],
});

module.exports = mongoose.model("Menu", menuSchema);
