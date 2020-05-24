const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req,res) =>{
    Category.find().then(category => res.json(category)).
    catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const url = req.body.url;
    const newCategory = new Category({name,url});

    newCategory.save()
        .then(() => res.json({msg:'Category added successfully...!'}))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Category.findById(req.params.id).
    then(category => res.json(category)).
    catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json({msg:'Category is deleted successfully...!'}))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').put((req, res) => {
    Category.findByIdAndUpdate(req.params.id)
        .then(category => {
            category.name = req.body.name;
            category.url = req.body.url;
            category.save()
                .then(() => res.json({msg:'Category updated successfully...!'}))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(err => res.status(400).json('Error ' + err));
});
router.route('/searchCategory/:id').post((req,res) =>{
    const id = req.params.id;
    console.log(id)

    SubCategory.find({ _id: id }).then(subCategories => res.json(subCategories)).
    catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;