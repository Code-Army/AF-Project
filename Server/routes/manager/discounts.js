const  router = require('express').Router();
let Discount = require('../../models/manager/discount.model');

router.route ('/').get((req,res) => {
    Discount.find()
        .then(discounts => res.json(discounts))
        .catch(err => res.status(400).json('Error : ' + err));

});

router.route('/add').post((req,res) => {
    const discountname = req.body.discountname;
    const discountprecentage = req.body.discountprecentage;
    const productname = req.body.productname;

    const newDiscount= new Discount({
        discountname,
        discountprecentage,
        productname,

    });

    newDiscount.save()
        .then(() => res.json('new Discount added'))
        .catch(err => res.status(400).json('Error : ' + err));

});
router.route('/:id').get((req,res) => {
    Discount.findById(req.params.id)
        .then(discount => res.json(discount))
        .catch(err => res.status(400).json('Error :' + err))
});
router.route('/:id').delete((req,res) => {
    Discount.findByIdAndDelete(req.params.id)
        .then(() => res.json('Discount deleted.'))
        .catch(err => res.status(400).json('Error :' + err))
});
// router.get("/pruduct_by_name", (req, res) => {
//     let type = req.query.type
//     let name = req.query.name
//
//     if (type === "array") {
//         let names = req.query.name.split(',');
//         name = [];
//         name = names.map(item => {
//             return item
//         })
//     }
//
//     console.log(name)
//     //we need to find the product information that belong to product Id
//     Product.find({ 'productname': { $in: name } })
//         .populate('writer')
//         .exec((err, product) => {
//             if(err) return req.status(400).send(err)
//             return res.status(200).send(product)
//         })
// });
router.route('/update/:id').post((req,res) => {
    Discount.findById(req.params.id)
        .then(discount => {
            discount.discountname = req.body.discountname;
            discount.discountprecentage = req.body.discountprecentage;
            discount.productname = req.body.productname;


            discount.save()
                .then(() => res.json('discount Updated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))
});


module.exports = router;