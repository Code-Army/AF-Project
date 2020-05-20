const router = require('express').Router();
let Order = require('../models/OrderLst.model');

router.route('/').get((req, res) => {
    Order.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {

    const userId = req.body.userId;
    const purchasesId = req.body.purchasesId;
    const productId = req.body.productId;
    const productName = req.body.productName;
    const img = req.body.img;
    const status = "pending";


    const newOrder = new Order({userId,purchasesId,productId,productName,img,status});

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/user_by_id", (req, res) => {
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
    Order.find({ 'userId': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});

router.route('/update/:id').post((req, res) => {
    Order.findById(req.params.id)
        .then(orders => {
             orders.status = "complete";

            orders.save()
                .then(() => res.json('Order Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;