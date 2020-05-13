const router = require('express').Router();
let Cart = require('../models/cart.model');

router.route('/').get((req, res) => {
    Cart.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const userId = 1234;
    const productId = req.body.productId;
    const productName = req.body.productName;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const total = req.body.total;

    const newCart = new Cart({userId,productId,productName,price,quantity,total });

    newCart.save()
        .then(() => res.json('Cart added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    Cart.findByIdAndDelete(req.params.id)
        .then(() => res.json('Cart deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;