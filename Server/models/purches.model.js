const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchasesSchema = new Schema({

    userId:{type: Number},
    purchasesId:{ type: String, required: true},
    total:{type: String, required: true}



}, {
    timestamps: true,
});

const Purchases = mongoose.model('Purchases', purchasesSchema);

module.exports = Purchases;