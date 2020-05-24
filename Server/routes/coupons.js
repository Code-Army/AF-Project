const  router = require('express').Router();
let Coupon = require('../models/coupon.model.js');

//handles incoming http get requests on '/' coupon url
router.route ('/').get((req,res) => {
    Coupon.find()
        .then(coupons => res.json(coupons))
        .catch(err => res.status(400).json('Error : ' + err));

});

//handles incoming http post requests on '/add' coupon url
router.route('/add').post((req,res) => {
    // assign feilds to variables
    const couponname = req.body.couponname;
    const couponcode = req.body.couponcode;
    const couponamount =  Number(req.body.couponamount);

    //create a new instance of Coupon using variables and assign to newCoupon
    const newCoupon = new Coupon({
        couponname,
        couponcode,
        couponamount,

    });
    //save new coupon to database
    newCoupon.save()
        .then(() => res.json('coupon added'))
        .catch(err => res.status(400).json('Error : ' + err));

});

//handles incoming http get requests on '/:id' coupon url
router.route('/:id').get((req,res) => {
    Coupon.findById(req.params.id)
        .then(coupon => res.json(coupon))
        .catch(err => res.status(400).json('Error :' + err))
});

//handles incoming http delete requests on '/:id' coupon url
router.route('/:id').delete((req,res) => {
    Coupon.findByIdAndDelete(req.params.id)
        .then(() => res.json('coupon deleted.'))
        .catch(err => res.status(400).json('Error :' + err))
});

//handles incoming http get requests on '/search/search_by_cname' coupon url
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

    //find the discount information that belongs to coupon name
    Coupon.find({ 'couponname': { $in: cnames } })
        .populate('writer')
        .exec((err, coupon) => {

            if(err) return req.status(400).send(err)
            return res.status(200).send(coupon)
        })
});
//handles incoming http post requests on '/update/:id' coupon url
router.route('/update/:id').post((req,res) => {
    Coupon.findById(req.params.id)
        .then(coupon => {
            coupon.couponname = req.body.couponname;
            coupon.couponcode = req.body.couponcode;
            coupon.couponamount = Number(req.body.couponamount);


            coupon.save()
                .then(() => res.json('Coupon Updated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))
});


module.exports = router;