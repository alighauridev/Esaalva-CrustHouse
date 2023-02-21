const mongoose = require('mongoose');
const { Schema } = mongoose;

const administratorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const Administrator = mongoose.model('Administrator', administratorSchema);

module.exports = Administrator;
