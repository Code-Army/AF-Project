const router = require('express').Router();
let SubCategory = require('../models/subCategory.model');

router.route('/').get((req,res) =>{
    SubCategory.find().then(subCategory => res.json(subCategory)).
    catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    let category = req.body.category;
    const url = req.body.url;
    console.log(category)

    const newsubCategory = new SubCategory({name,category,description,url});
    newsubCategory.save()
        .then(() => res.json('Sub category added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;