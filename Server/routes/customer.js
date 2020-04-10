const router = require('express').Router();
let customer = require('../models/customer.model');

router.route('/').get((req, res) => {
    customer.find()
      .then(customer => res.json(customer))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/add').post((req, res) => {
    const cFirstName = req.body.cFirstName;
    const cLastname = req.body.cLastname;
    const cemail = req.body.cemail;
    const cpassword = req.body.cpassword;
    const cbirthday = Date.parse(req.body.cbirthday);
    const cContactNo = Number(req.body.cContactNo);
    

    const newCustomer = new customer({cFirstName,cLastname, cemail, cpassword, cbirthday, cContactNo });
  
    newCustomer.save()
      .then(() => res.json('Customer  added!'))

  });

router.route('/:id').get((req, res) => {
        customer.findById(req.params.id)
          .then(customer => res.json(customer))
          .catch(err => res.status(400).json('Error: ' + err));
      });

router.route('/:id').delete((req, res) => {
        customer.findByIdAndDelete(req.params.id)
          .then(() => res.json('Customer deleted.'))
          .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').put((req,res)=> {
    customer.findByIdAndUpdate(req.params.id)
        .then(customer => {
            const cFirstName = req.body.cFirstName;
            const cLastname = req.body.cLastname;
            const cemail = req.body.cemail;
            const cpassword = req.body.cpassword;
            const cbirthday = Date.parse(req.body.cbirthday);
            const cContactNo = Number(req.body.cContactNo);

            customer.save()
                .then(() => res.json('customer updated!'))
                .catch(err => res.status(400).json('Error: ' +err));
        })
        .catch(err => res.status(400).json('Error '+err));
});

  module.exports = router;
