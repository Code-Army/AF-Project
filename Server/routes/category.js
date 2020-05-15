const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req,res) =>{
    Category.find().then(category => res.json(category)).
    catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    // const description = req.body.description;
    const url = req.body.url;
    const newCategory = new Category({name,url});

    newCategory.save()
        .then(() => res.json('Category added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;