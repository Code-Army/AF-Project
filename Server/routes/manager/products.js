const  router = require('express').Router();
let Product = require('../../models/manager/product.model');

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
    const shortdiscription = req.body.shortdiscription;
    const specification = req.body.specification;
    const availability = req.body.availability;
    const url1 = req.body.url1;
    const url2 = req.body.url2;
    const url3= req.body.url3;

    const newProduct = new Product({
        productname,
        category,
        subcategory,
        specification,
        availability,
        price,
        oprice,
        description,
        shortdiscription,
        url1,
        url2,
        url3

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
router.get("/pruduct_by_name", (req, res) => {
    let type = req.query.type
    let name = req.query.name

    if (type === "array") {
        let names = req.query.name.split(',');
        name = [];
        name = names.map(item => {
            return item
        })
    }

    console.log(name)
    //we need to find the product information that belong to product Id
    Product.find({ 'productname': { $in: name } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
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
            producut.shortdiscription = req.body.shortdiscription;
            producut.availability = req.body.availability;
            producut.specification = req.body.specification;

            producut.save()
                .then(() => res.json('Product Updated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))

});


module.exports = router;