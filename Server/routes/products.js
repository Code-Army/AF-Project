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

router.get("/Product_by_Subid", (req, res) => {
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

// router.post('/SearchProduct', (req, res)=>{
//     const product = req.body.productname;
//     console.log(product);
//
//     Product.find({productname:product}).then(Product=> res.json(Product)).catch(err => res.status(400).json('Error:' +err));
// } );

// router.get("/", function(req, res){
//     var noMatch = null;
//     if(req.query.search) {
//         const regex = new RegExp(escapeRegex(req.query.search), 'gi');
//         // Get all campgrounds from DB
//         Product.find({productname: regex}, function(err, allProducts){
//             if(err){
//                 console.log(err);
//             } else {
//                 if(allProducts.length < 1) {
//                     noMatch = "No Products match that query, please try again.";
//                 }
//                 res.render("products/index",{productname:allProducts, noMatch: noMatch});
//             }
//         });
//     } else {
//         // Get all Products from DB
//         Product.find({}, function(err, allProducts){
//             if(err){
//                 console.log(err);
//             } else {
//                 res.render("campgrounds/index",{productname:allProducts, noMatch: noMatch});
//             }
//         });
//     }
// });
// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// };

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