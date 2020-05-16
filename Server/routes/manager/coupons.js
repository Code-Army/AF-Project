const  router = require('express').Router();
let Coupon = require('../../models/manager/coupon.model');

router.route ('/').get((req,res) => {
    Coupon.find()
        .then(coupons => res.json(coupons))
        .catch(err => res.status(400).json('Error : ' + err));

});

router.route('/add').post((req,res) => {
    const couponname = req.body.couponname;
    const couponcode = req.body.couponcode;
    const couponamount = req.body.couponamount;


    const newCoupon = new Coupon({
        couponname,
        couponcode,
        couponamount,

    });

    newCoupon.save()
        .then(() => res.json('coupon added'))
        .catch(err => res.status(400).json('Error : ' + err));

});
router.route('/:id').get((req,res) => {
    Coupon.findById(req.params.id)
        .then(coupon => res.json(coupon))
        .catch(err => res.status(400).json('Error :' + err))
});
router.route('/:id').delete((req,res) => {
    Coupon.findByIdAndDelete(req.params.id)
        .then(() => res.json('coupon deleted.'))
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
    Coupon.findById(req.params.id)
        .then(producut => {
            Coupon.couponname = req.body.couponname;
            Coupon.couponcode = req.body.couponcode;
            Coupon.couponamount = req.body.couponamount;


            producut.save()
                .then(() => res.json('Product Updated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))
});


module.exports = router;