const router = require('express').Router();
let SubCategory = require('../models/subCategory.model');

router.route('/').get((req,res) =>{

});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const image = req.body.image;
    const newsubCategory = new SubCategory({name,category,description,image});
    newsubCategory.save()
        .then(() => res.json('Sub category added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;