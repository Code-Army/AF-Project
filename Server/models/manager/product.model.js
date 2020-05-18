const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const productSchema = new Schema({

        productname: {type: String,required: true},
        specification: {type:String,default: " "},
        availability: {type:String,default: " "},
        description: {type:String,default: " "},
        shortdiscription:{type:String,default:" "},
        price: {type:String,default: ""},
        category: {type:String,default:""},
        cid: {type:String,default:""},
        sid: {type:String,default:""},
        subcategory: {type:String,default:""},
        oprice: {type:String,default:""},
        url1 : {type:String, default:""},
    }, {
        timestamps:true,

    });

const Product = mongoose.model('Product',productSchema);

module.exports = Product;