//require express router
const  router = require('express').Router();
//require model
let Product = require('../models/product.model.js');

//handles incoming http get requests on '/' products url
router.route ('/').get((req,res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error : ' + err));

});
//handles incoming http post requests on '/add' products url
router.route('/add').post((req,res) => {
    // assign feilds to variables
    const productname = req.body.productname;
    const category = req.body.category;
    const subcategory = req.body.subcategory;
    const cid = req.body.cid;
    const sid = req.body.sid;
    const price = Number(req.body.price);
    const oprice = Number(req.body.oprice);
    const description = req.body.description;
    const shortdiscription = req.body.shortdiscription;
    const specification = req.body.specification;
    const availability = req.body.availability;
    const url1 = req.body.url1;
    const url2 = req.body.url2;
    const url3= req.body.url3;
    const discount = "0";

    //create a new instance of Product using variables and assign to newProduct
    const newProduct = new Product({
        productname,
        category,
        subcategory,
        specification,
        availability,
        price,
        cid,
        sid,
        oprice,
        description,
        shortdiscription,
        url1,
        url2,
        url3,
        discount

    });

    //save new product to database
    newProduct.save()
        .then(() => res.json('Product added'))
        .catch(err => res.status(400).json('Error : ' + err));


    });
//handles incoming http get requests on '/:id' products url
router.route('/:id').get((req,res) => {
   Product.findById(req.params.id)
       .then(producut => res.json(producut))
       .catch(err => res.status(400).json('Error :' + err))
});
//handles incoming http delete requests on '/:id' products url
router.route('/:id').delete((req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('product deleted.'))
        .catch(err => res.status(400).json('Error :' + err))
});
//handles incoming http post requests on '/update/:id' products url
router.route('/update/:id').post((req,res) => {
    Product.findById(req.params.id)
        .then(producut => {
            producut.productname = req.body.productname;
            producut.category = req.body.category;
            producut.subcategory = req.body.subcategory;
            producut.price =  Number(req.body.price);
            producut.oprice =  Number(req.body.oprice);
            producut.description = req.body.description;
            producut.shortdiscription = req.body.shortdiscription;
            producut.availability = req.body.availability;
            producut.specification = req.body.specification;
            producut.url1= req.body.url1;

            producut.save()
                .then(() => res.json('Product Updated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))

});


router.route('/updateDiscount/:id').post((req,res) => {
    Product.findById(req.params.id)
        .then(producut => {
            producut.discount = req.body.discountamount;


            producut.save()
                .then(() => res.json('Product Discount Updated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))

});


//handles incoming http get requests on '/search/search_by_name' products url
router.get("/search/search_by_name", (req, res) => {
    let type = req.query.type
    let productIds = req.query.name

    if (type === "array") {
        let ids = req.query.name.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }
    //find the discount information that belongs to product name
    Product.find({ 'productname': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {

            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});

router.get("/subProduct/Product_by_Subid", (req, res) => {
    let type = req.query.type;
    let productIds = req.query.id;

    console.log(productIds);
    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id
    Product.find({ 'sid': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err);
            return res.status(200).send(product)
        })
});



router.post("/getProducts", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log(findArgs)

    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    } else {
        Product.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    }

});


module.exports = router;