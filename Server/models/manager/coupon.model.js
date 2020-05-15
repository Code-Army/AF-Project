const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const couponSchema = new Schema({

    couponname: {type: String,required: true},
    couponcode: {type:String,required: true,default: " "},
    couponamount: {type: String,required: true,default: ""},

}, {
    timestamps:true,

});

const Coupon = mongoose.model('Coupon',couponSchema);

module.exports = Coupon;