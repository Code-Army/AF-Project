const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({

    userId:{type: Number},
    productId:{ type: String, required: true},
    productName:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type: Number, required: true},
    total:{type: Number, required: true}



}, {
    timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;