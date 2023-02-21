const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    order: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
    tableNumber: { type: Number },
    status: { type: String },
    delay: { type: Number },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
