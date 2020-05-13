const router = require('express').Router();
let Feedback = require('../models/Feedback.model');


router.route('/').get((req, res) => {
    Feedback.find()
        .then(feedbacks => res.json(feedbacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const userID = "1234";
    const productId = req.body.productId;
    const feedback = req.body.feedback;
    const rate = req.body.feedback;


    const newFeedback = new Feedback({userID ,productId,feedback,rate});

    newFeedback.save()
        .then(() => res.json('Feedback added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/feedback_by_id", (req, res) => {
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
    Feedback.find({ 'productId': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});


module.exports = router;