const  router = require('express').Router();
let Discount = require('../models/discount.model.js');

//handles incoming http get requests on '/' discount url
router.route ('/').get((req,res) => {
    Discount.find()
        .then(discounts => res.json(discounts))
        .catch(err => res.status(400).json('Error : ' + err));

});

//handles incoming http post requests on '/add' discount url
router.route('/add').post((req,res) => {
    // assign feilds to variables
    const discountname = req.body.discountname;
    const discountamount = Number(req.body.discountamount);
    const productname = req.body.productname;
    const productId = req.body.productId;

    //create a new instance of Discount using variables and assign to newDiscount
    const newDiscount= new Discount({
        discountname,
        productId,
        discountamount,
        productname,

    });
    //save new discount to database
    newDiscount.save()
        .then(() => res.json('new Discount added'))
        .catch(err => res.status(400).json('Error : ' + err));

});
//handles incoming http get requests on '/:id' discount url
router.route('/:id').get((req,res) => {
    Discount.findById(req.params.id)
        .then(discount => res.json(discount))
        .catch(err => res.status(400).json('Error :' + err))
});

//handles incoming http delete requests on '/:id' discount url
router.route('/:id').delete((req,res) => {
    Discount.findByIdAndDelete(req.params.id)
        .then(() => res.json('Discount deleted.'))
        .catch(err => res.status(400).json('Error :' + err))
});

//handles incoming http get requests on '/search/search_by_dname' discount url
router.get("/search/search_by_dname", (req, res) => {
    let type = req.query.type
    let dnames = req.query.name

    if (type === "array") {
        let names = req.query.name.split(',');
        dnames = [];
        dnames = names.map(item => {
            return item
        })
    }

    //find the discount information that belongs to discont name
    Discount.find({ 'discountname': { $in: dnames } })
        .populate('writer')
        .exec((err, discount) => {

            if(err) return req.status(400).send(err)
            return res.status(200).send(discount)
        })
});

//handles incoming http post requests on '/update/:id' discount url
router.route('/update/:id').post((req,res) => {
    Discount.findById(req.params.id)
        .then(discount => {
            discount.discountname = req.body.discountname;
            discount.discountamount =Number( req.body.discountamount);
            discount.productname = req.body.productname;


            discount.save()
                .then(() => res.json('discount Updated.'))
                .catch(err => res.status(400).json('Error :' +err));
        })
        .catch(err => res.status(400).json('Error :' + err))
});


module.exports = router;