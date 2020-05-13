const router = require('express').Router();
let Purchases = require('../models/purches.model');


router.route('/add').post((req, res) => {
    const userId = 1234;
    const purchasesId = req.body.purchasesId;
    const total = req.body.total;

    const newPurchases = new Purchases({userId,purchasesId,total});

    newPurchases.save()
        .then(() => res.json('Purchases added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;