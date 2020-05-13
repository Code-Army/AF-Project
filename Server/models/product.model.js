const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const productSchema = new Schema({

        productname: {type: String,required: true},
        description: {type:String,default: " "},
        price: {type: String,default: ""},
        category:{type : String,default:""},
        subcategory:{type : String,default:""},
        oprice:{type : String,default:""},
        url : {type : String, default:""}
    }, {
        timestamps:true,

    });

const Product = mongoose.model('Product',productSchema);

module.exports = Product;