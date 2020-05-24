//require mongoose
const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const discountSchema = new Schema({
    //feilds
    discountname: {type: String,required: true},
    productId:{type:String,required:true},
    discountamount: {type: Number,required: true},
    productname: {type: String,required: true},


}, {
    timestamps:true,

});

const Discount = mongoose.model('Discount',discountSchema);

module.exports = Discount;