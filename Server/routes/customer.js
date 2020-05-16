const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Customer = require("../models/customer.model");

router.post("/register", async (req, res) => {
  try {
    let { CFirstName, CLastName, Cemail, Cpassword, CpasswordCheck, CUserName  } = req.body;

    // validate

    if ( !CFirstName || !CLastName || !Cemail || !Cpassword || !CpasswordCheck)
      return res.status(400).json({ msg: "Please Fill All The Fields." });
    if (Cpassword.length < 6)
      return res
          .status(400)
          .json({ msg: "The Entered password needs to be at least 6 characters long." });
    if (Cpassword !== CpasswordCheck)
      return res
          .status(400)
          .json({ msg: "Please Enter Same Password for Verification." });

    const existingCustomer = await Customer.findOne({ Cemail: Cemail });
    if (existingCustomer)
      return res
          .status(400)
          .json({ msg: "An account with this email already Registed Please Sign In." });

    if (!CUserName) CUserName = Cemail;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(Cpassword, salt);

    const newCustomer = new Customer({
      CFirstName,
      CLastName,
      Cemail,
      Cpassword: passwordHash,
      CUserName,
    });
    const savedCustomer = await newCustomer.save();
    res.json(savedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Cemail, Cpassword } = req.body;

    // validate
    if (!Cemail || !Cpassword)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const customer = await Customer.findOne({ Cemail: Cemail });
    if (!customer)
      return res
          .status(400)
          .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(Cpassword, customer.Cpassword);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const payload = {
      id: customer._id,
      CUserName: customer.CUserName,
      CFirstName: customer.CFirstName,
      CLastName: customer.CLastName,
      Cemail:customer.Cemail,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json(token);

    // const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);
    // res.json({
    //   token,
    //   customer: {
    //     id: customer._id,
    //     CUserName: customer.CUserName,
    //     CFirstName: customer.CFirstName,
    //     CLastName: customer.CLastName,
    //     Cemail:customer.Cemail,
    //
    //   },

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.customer);
    res.json(deletedCustomer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const customer = await Customer.findById(verified.id);
    if (!customer) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {

    const customer = await Customer.findById(req.customer);
    res.json({
      CUserName: customer.CUserName,
      id: customer._id,

    });

});

module.exports = router;
