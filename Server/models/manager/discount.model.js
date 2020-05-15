const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const discountSchema = new Schema({

    discountname: {type: String,required: true},
    discountprecentage: {type: String,required: true},


}, {
    timestamps:true,

});

const Discount = mongoose.model('Discount',discountSchema);

module.exports = Discount;