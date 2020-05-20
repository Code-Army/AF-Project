const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderedSchema = new Schema({

    userId:{type: String},
    purchasesId:{type: String},
    productId:{ type: String, required: true},
    productName:{ type: String, required: true},
    img:{ type: String, required: true},
    status:{ type: String, required: true}




}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderedSchema);

module.exports = Order;