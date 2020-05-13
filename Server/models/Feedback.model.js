const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({

    userId:{type: Number},
    productId:{ type: String, required: true},
    feedback:{ type: String, required: true},
    rate:{type: String},


}, {
    timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;