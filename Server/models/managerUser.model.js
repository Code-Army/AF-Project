const mongoose = require('mongoose');

const  Schema = mongoose.Schema;

const managerUserSchema = new Schema({

        productname: {
            type: String,
            required: true,
        },
        description:{
            type:String,
            default: " ",
        },

        price: {
            type: String,
            default: "pending",
        } },
    {
        timestamps:true

    });

const ManagerUser = mongoose.model('ManagerUser',managerUserSchema);

module.exports = ManagerUser;