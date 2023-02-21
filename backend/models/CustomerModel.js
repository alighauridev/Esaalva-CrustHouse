const mongoose = require('mongoose');
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bookingDateTime: { type: Date, required: true },
    readyDateTime: { type: Date, required: true },
    currentCoordinates: { type: String },
    order: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    reservation: {
        tableNumber: { type: Number },
        numberOfPeople: { type: Number },
        expectedTimeOfArrival: { type: Date },
    },
    paymentDetails: {
        method: { type: String, required: true },
        amount: { type: Number, required: true },
        status: { type: String },
        transactionId: { type: String },
    },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;