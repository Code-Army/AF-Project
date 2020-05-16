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
        subcategory: {type:String,default:""},
        oprice: {type:String,default:""},
        url1 : {type:String, default:""},
        url2 : {type:String, default:"https://www.google.com/imgres?imgurl=https%3A%2F%2F4.imimg.com%2Fdata4%2FBS%2FKY%2FMY-440847%2Fbaby-soap-250x250.jpg&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Fbath-soaps-13351893388.html&tbnid=UizqKip6xf1WgM&vet=12ahUKEwiXqaeO3rfpAhXdkuYKHRCvAWkQMygKegUIARC2Ag..i&docid=9J4cmP7jyovdbM&w=250&h=250&q=baby%20soaps&safe=active&ved=2ahUKEwiXqaeO3rfpAhXdkuYKHRCvAWkQMygKegUIARC2Ag"},
        url3 : {type:String, default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.in%2FJohnsons-20005893-Baby-Soap-100g%2Fdp%2FB01LZ2WYKH&psig=AOvVaw0kMzU8ym0bdG513jaOhLy7&ust=1589696239055000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCi6o_et-kCFQAAAAAdAAAAABAD"}
    }, {
        timestamps:true,

    });

const Product = mongoose.model('Product',productSchema);

module.exports = Product;