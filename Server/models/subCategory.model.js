const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
    name:{
        type: String,
        required:true,
    },

    category:{
        type:String,
    },

    description:{
        type:String,

    },

    image: {
        type: String,

    } },
);

const SubCategory = mongoose.model('SubCategory',SubcategorySchema);
module.exports = SubCategory;