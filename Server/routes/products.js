const  router = require('express').Router();
let Product = require('../models/product.model');

router.route ('/').get((req,res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error : ' + err));

});

router.route('/add').post((req,res) => {
    const productname = req.body.productname;
    const price = req.body.price;
    const description = req.body.description;

    const newProduct = new Product({
        productname,
        price,
        description,
    });

    newProduct.save()
        .then(() => res.json('Product added'))
        .catch(err => res.status(400).json('Error : ' + err));

    });
router.route('/:id').get((req,res) => {
   Product.findById(req.params.id)
       .then(producut => res.json(producut))
       .catch(err => res.status(400).json('Error :' + err))
});
router.route('/:id').delete((req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('product deleted.'))
        .catch(err => res.status(400).json('Error :' + err))
});

router.route('/update/:id').post((req,res) => {
    Product.findById(req.params.id)
        .then(producut => {
            producut.productname = req.body.productname;
            producut.price = req.body.price;
            producut.description = req.body.description;

            producut.save()
                .then(() => res.json('Product Upadated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))
});


module.exports = router;