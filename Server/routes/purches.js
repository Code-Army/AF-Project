const router = require('express').Router();
let Purchases = require('../models/purches.model');

//adding purchases details

router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const purchasesId = req.body.purchasesId;
    const total = req.body.total;
    const paymentMethod = req.body.paymentMethod

    const newPurchases = new Purchases({userId,purchasesId,paymentMethod,total});

    newPurchases.save()
        .then(() => res.json('Purchases added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;