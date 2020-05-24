const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const billingSchema = new Schema({

    userId:{type: String},
    purchasesId:{type: String},
    firstName:{ type: String},
    lastName:{type:String},
    addressLine1:{type:String},
    addressLine2:{type: String},
    zip:{type: String},
    phone:{type: String},




}, {
    timestamps: true,
});

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;