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
router.get("/search/search_by_cname", (req, res) => {
    let type = req.query.type
    let cnames = req.query.cname

    if (type === "array") {
        let ids = req.query.cname.split(',');
        cnames = [];
        cnames = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id
    Coupon.find({ 'couponname': { $in: cnames } })
        .populate('writer')
        .exec((err, coupon) => {

            if(err) return req.status(400).send(err)
            return res.status(200).send(coupon)
        })
});
router.route('/update/:id').post((req,res) => {
    Coupon.findById(req.params.id)
        .then(coupon => {
            coupon.couponname = req.body.couponname;
            coupon.couponcode = req.body.couponcode;
            coupon.couponamount = req.body.couponamount;


            coupon.save()
                .then(() => res.json('Coupon Updated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))
});


module.exports = router;