const  router = require('express').Router();
let Product = require('../models/product.model');

router.route ('/').get((req,res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error : ' + err));

});

router.route('/add').post((req,res) => {
    const productname = req.body.productname;
    const category = req.body.category;
    const subcategory = req.body.subcategory;
    const price = req.body.price;
    const oprice = req.body.oprice;
    const description = req.body.description;
    const url = req.body.url;

    const newProduct = new Product({
        productname,
        category,
        subcategory,
        price,
        oprice,
        description,
        url,

    });

    newProduct.save()
        .then(() => res.json('Product added'))
        .catch(err => res.status(400).json('Error : ' + err));

    });
router.route('/:id').get((req,res) => {
   Product.findById(req.params.id)
       .then(producut => res.json(product))
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
            producut.category = req.body.category;
            producut.subcategory = req.body.subcategory;
            producut.price = req.body.price;
            producut.oprice = req.body.oprice;
            producut.description = req.body.description;

            producut.save()
                .then(() => res.json('Product Upadated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))
});

router.get("/Product_by_Subcat", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    console.log(productIds)
    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id
    Product.find({ 'subcategory': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});

module.exports = router;