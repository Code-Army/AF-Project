const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({

    CFirstName: { type: String, required: true },
    CLastName: { type: String, required: true},
    Cemail: { type: String, required: true },
    Cpassword: { type: String, required: true, minlength: 5 },
    CUserName: { type: String },
});

module.exports = Customer = mongoose.model("Customer", CustomerSchema);
