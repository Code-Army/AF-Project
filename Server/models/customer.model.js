const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    cFirstName:{ type : String , required : true , minlength: 3 },
    cLastname:{ type : String , required: true,minlength: 3 },
    cemail:{ type : String,required: true },
    cpassword:{ type: String , required: true , minlength: 4 },
    cbirthday:{ type: Date,required:true },
    cContactNo:{ type: Number , required:true }

});

const customer = mongoose.model('customer',customerSchema);
 module.exports = customer;