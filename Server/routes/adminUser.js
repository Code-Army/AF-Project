
const router = require('express').Router();
const mailer = require('nodemailer')
const bcrypt = require('bcryptjs')
let AdminUser = require('../models/adminUser.model');
let generator = require('generate-password');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth')

router.route('/').get((req, res) => {
    AdminUser.find().then(adminUsers => res.json(adminUsers)).
    catch(err => res.status(400).json('Error: ' + err));
});

router.put("/changepassword", auth, async (req, res) => {
    try {
        let _id = req.body._id;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        console.log(req.body)

        const existingUser = await AdminUser.findOne({ _id: _id });
        console.log(existingUser)
        if (!existingUser) {
            console.log('not exist')
            return res
                .status(400)
                .json({ msg: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
        if (!isMatch) {
            console.log()
            console.log("Incorrect password")
            return res.status(400).json({ msg: "Invalid Password" });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);
        existingUser.password = passwordHash;
        existingUser.firstLogin = 1;
        const saved = await existingUser.save();

        // console.log(password);
        res.json(saved)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/add", async (req, res) => {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let role = req.body.role

        const existingUser = await AdminUser.findOne({ email: req.body.email });
        console.log(existingUser)
        if (existingUser) {
            res.json({msg:'Already exist a user with the given Email'})
            console.log('exist')
            return res
                .status(400)
                .json({ msg:'Already exist a user with the given Email' })
        }
        const password = generator.generate({
            length: 10,
            numbers: true
        });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newAdminUser = new AdminUser({ name, email, password: passwordHash, role });
        const saved = await newAdminUser.save();

        console.log(password)

        res.json({msg:'Registered successfully..!'})
        sendMail(name, email, password)


    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

router.route('/:id').get((req, res) => {
    AdminUser.findById(req.params.id).
    then(adminUser => res.json(adminUser)).
    catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete((req, res) => {
    AdminUser.findByIdAndDelete(req.params.id)
        .then(() => res.json({msg:'User is deleted successfully..!'}))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').put((req, res) => {
    AdminUser.findByIdAndUpdate(req.params.id)
        .then(adminUser => {
            adminUser.name = req.body.name;
            adminUser.email = req.body.email;

            adminUser.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })

        .catch(err => res.status(400).json('Error ' + err));
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        let password = req.body.password;

        const adminUser = await AdminUser.findOne({ email: email });

        if (!adminUser) {
            console.log(adminUser)
            console.log("wrong email")
            return res
                .status(400)
                .json({ msg: "No valid account for the given email" })

        }
        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            console.log()
            console.log("Incorrect password")
            return res.status(400).json({ msg: "Invalid Password" });

        }

        if(adminUser.status === "pending"){
            adminUser.status = "active";
            await adminUser.save();
        }

        const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET);
        res
            .status(200)
            .json({
                token,
                adminUser
            });


    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})



const sendMail = (name, recipient, password) => {
    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "apicoders.codeArmy@gmail.com",
            pass: "p5@k@a9833"

        }
    })
    var content = "This is an autogenerated mail by the Dress Me. This is to inform you that an account is created for you in the Dress Me official website with the email " + recipient + " . Please login to the website using the link and use email address as " + recipient + " and password as " + password + " for your first login.";
    //document.getElementById("econtent").innerHTML = content;
    const data = {
        from: "Dress Me <apicoders.codeArmy@gmail.com>",
        to: recipient,
        subject: 'Registering to the Dress Me website',
        text: content

    }
    smtpTransport.sendMail(data, function (err, res) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('email send successfully')
        }
        smtpTransport.close();
    })
}

module.exports = router;