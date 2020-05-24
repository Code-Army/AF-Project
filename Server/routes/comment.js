const router = require('express').Router();
let Comment = require('../models/comment.model');


router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const comment = req.body.comment;


    const newComment = new Comment({userId,productId,name,email,phone,comment });

    newComment.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.get("/comment_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id
    Comment.find({ 'productId': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});

module.exports = router;