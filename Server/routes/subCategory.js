
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
        .then(() => res.json('Sub category added!'))
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




router.route('/:id').post((req, res)=>{

    // const category = req.param.id;
    // console.log(category);
    // SubCategory.find({ category: category }).
    // then(subcategory => res.json(subcategory)).
    // catch(err => res.status(400).json('Error: '+err));

        // const category = req.params.id;
        // console.log(category)
        // SubCategory.find({ category: category }).
        // then(subcategory => res.json(subcategory)).
        // catch(err => res.status(400).json('Error: '+err));








    // SubCategory.find({category:req.param.category})
    //     .then(subCategory => res.json(subCategory))
    //     .catch(err => res.status(400).json('Error :' + err))
});
module.exports = router;