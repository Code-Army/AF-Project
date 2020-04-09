const router = require('express').Router();
let AdminUser = require('../models/adminUser.model');

router.route('/').get((req,res) =>{
    AdminUser.find().then(adminUsers => res.json(adminUsers)).
    catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const email = req.body.email;

    const newAdminUser = new AdminUser({name,email});

    newAdminUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    AdminUser.findById(req.params.id).
    then(adminUser => res.json(adminUser)).
    catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete((req,res) => {
    AdminUser.findByIdAndDelete(req.params.id)
        .then(() => res.json('User is deleted'))
        .catch(err => res.status(400).json('Error '+err));
});

router.route('/:id').put((req,res)=> {
    AdminUser.findByIdAndUpdate(req.params.id)
        .then(adminUser => {
            adminUser.name = req.body.name;
            adminUser.email = req.body.email;

            adminUser.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' +err));
        })
        .catch(err => res.status(400).json('Error '+err));
});



module.exports = router;