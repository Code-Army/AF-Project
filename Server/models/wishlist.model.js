//require mongoose
const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const whishlistSchema = new Schema({

    //feilds
    productID: {type: String,required: true},
    userID: {type: String,required: true},
    productname: {type: String,required: true},
    url:{type:String}

}, {
    timestamps:true,

});

const Product = mongoose.model('Wishlist',whishlistSchema);

module.exports = Product;