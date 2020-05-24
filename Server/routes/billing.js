const router = require('express').Router();
let Billing = require('../models/billing.model');




router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const purchasesId = req.body.purchasesId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const addressLine1 = req.body.addressLine1;
    const addressLine2 = req.body.addressLine2;
    const zip = req.body.zip;
    const phone = req.body.phone;

    const newBill = new Billing({userId,purchasesId,firstName,lastName,addressLine1,addressLine2,zip,phone });

    newBill.save()
        .then(() => res.json('Bill added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;