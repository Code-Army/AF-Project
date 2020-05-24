//require mongoose
const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const couponSchema = new Schema({
    //feilds
    couponname: {type: String,required: true,trim:true},
    couponcode: {type:String,required: true,default: " "},
    couponamount: {type: Number,required: true,default: ""},

}, {
    timestamps:true,

});

const Coupon = mongoose.model('Coupon',couponSchema);

module.exports = Coupon;