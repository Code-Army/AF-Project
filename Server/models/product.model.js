//require mongoose
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const productSchema = new Schema({

        //feilds
        productname: {type: String,required: true},
        specification: {type:String,default: "non"},
        availability: {type:String,default: "non"},
        description: {type:String,default: "non"},
        shortdiscription:{type:String,default:"non"},
        price: {type:Number,default: 0},
        category: {type:String,default:"non"},
        cid: {type:String,default:"non"},
        sid: {type:String,default:"non"},
        subcategory: {type:String,default:"non"},
        oprice: {type:Number,default:0},
        url1 : {type:String, default:"non"},
        discount:{type:String,default:"non"}
    }, {
        timestamps:true,

    });

const Product = mongoose.model('Product',productSchema);

module.exports = Product;