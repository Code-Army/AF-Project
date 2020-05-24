
const router = require('express').Router();
let SubCategory = require('../models/subCategory.model');

router.route('/').get((req,res) =>{
    SubCategory.find().then(subCategory => res.json(subCategory)).
    catch(err => res.status(400).json('Error: '+err));
});
router.route('/add').post((req,res) => {
    const name = req.body.name;

    let category = req.body.category;
    const url = req.body.url;
    console.log(category)

    const newsubCategory = new SubCategory({name,category,url});
    newsubCategory.save()
        .then(() => res.json({msg:'Sub category added!'}))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.get("/category_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    console.log(productIds)
    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    //we need to find the product information that belong to product Id
    SubCategory.find({ 'category': { $in: productIds } })
        .populate('writer')
        .exec((err, product) => {
            if(err) return req.status(400).send(err)
            return res.status(200).send(product)
        })
});

router.route('/getSubCategory').post((req,res) =>{
    const category = req.body.category;
    console.log(category)

    SubCategory.find({ category: category }).then(subCategories => res.json(subCategories)).
    catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    SubCategory.findByIdAndDelete(req.params.id)
        .then(() => res.json({msg:'Subcategory is deleted successfully...!'}))
        .catch(err => res.status(400).json('Error ' + err));
});



router.route('/:id').get((req, res) => {
    SubCategory.findById(req.params.id).
    then(subcategory => res.json(subcategory)).
    catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').put((req, res) => {
    SubCategory.findByIdAndUpdate(req.params.id)
        .then(subcategory => {
            subcategory.name = req.body.name;
            subcategory.category = req.body.category;
            subcategory.url = req.body.url;
            subcategory.save()
                .then(() => res.json({msg:'subcategory updated!'}))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(err => res.status(400).json('Error ' + err));
});
module.exports = router;