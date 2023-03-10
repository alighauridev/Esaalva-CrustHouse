const mongoose = require('mongoose');

const orderOptionSchema = new mongoose.Schema({
    Option_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductOption' },
    Order_Item_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' },
});

const OrderOption = mongoose.model('OrderOption', orderOptionSchema);

module.exports = OrderOption;
