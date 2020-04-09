const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const adminUserSchema = new Schema({
        name:{
            type: String,
            required:true,
        },

        email: {
            type: String,
            required: true,
        },
        password:{
            type:String,
            default: " ",
        },

        status: {
            type: String,
            default: "pending",
        } },
    {
        timestamps:true

    });

const AdminUser = mongoose.model('AdminUser',adminUserSchema);

module.exports = AdminUser;