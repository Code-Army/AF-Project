const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    userId:{type: String},
    productId:{type: String},
    name:{type: String},
    email:{type: String},
    phone:{type: String},
    comment:{type: String},



}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;