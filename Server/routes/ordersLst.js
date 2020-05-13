const router = require('express').Router();
let Order = require('../models/OrderLst.model');

router.route('/').get((req, res) => {
    Order.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const userId = 1234;
    const productId = req.body.productId;


    const newOrder = new Order({userId,productId});

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;