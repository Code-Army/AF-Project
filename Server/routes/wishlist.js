const router = require('express').Router();
let Whislist = require('../models/wishlist.model');

router.route('/add').post((req, res) => {
    const userID = req.body.userID;
    const productID = req.body.productID;
    const productname = req.body.productname;
    const url = req.body.url;


    const whishlist = new Whislist({userID,productID,productname,url});

    whishlist.save()
        .then(() => res.json('Wishlist added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.get("/wishlist_by_id", (req, res) => {
    let type = req.query.type;
    let productIds = req.query.id;

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id
    Whislist.find({ 'userID': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});

router.route('/:id').delete((req, res) => {
    Whislist.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

    module.exports = router;