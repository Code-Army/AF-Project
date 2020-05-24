const router = require('express').Router();
let Cart = require('../models/cart.model');
let Coupon = require('../models/coupon.model');


router.route('/').get((req, res) => {
    Cart.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const productName = req.body.productName;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const total = req.body.total;
    const url = req.body.url;
    const size = req.body.size;

    const newCart = new Cart({userId,productId,productName,url,price,quantity,size,total });

    newCart.save()
        .then(() => res.json('Cart added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json('Cart new deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/cart_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //we need to find the cart information
    Cart.find({ 'userId': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {

            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
})


router.get("/coupon_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //we need to find the Coupon information
    Coupon.find({ 'couponcode': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
})
module.exports = router;