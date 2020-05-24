const router = require('express').Router();
let Order = require('../models/OrderLst.model');


//get users orders
router.route('/').get((req, res) => {
    Order.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

//adding users orders
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


//get user order using user id
router.get("/user_by_id", (req, res) => {
    let type = req.query.type
    let userId = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        userId = [];
        userId = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id
    Order.find({ 'userId': { $in: userId } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});


//update order status
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


router.route('/:id').delete((req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/search/search_by_pname", (req, res) => {
    let type = req.query.type
    let dnames = req.query.name

    if (type === "array") {
        let names = req.query.name.split(',');
        dnames = [];
        dnames = names.map(item => {
            return item
        })
    }

    //find the discount information that belongs to discont name
    Order.find({ 'productName': { $in: dnames } })
        .populate('writer')
        .exec((err, discount) => {

            if(err) return req.status(400).send(err)
            return res.status(200).send(discount)
        })
});

module.exports = router;