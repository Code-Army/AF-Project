const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
    process.env.ATLAS_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
    (err) => {
        if (err) throw err;
        console.log("MongoDB connection established");
    }

);
// set up routes

app.use("/customer", require("../Server/routes/customer"));
const  categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/subCategory');
app.use("/product", require("../Server/routes/products"));
const adminUserRouter = require('./routes/adminUser');
//const managerUserRouter = require('./routes/managerUser');

// app.use('/customer',customer);
app.use('/createAdminUser',adminUserRouter);
//app.use('/createManagerUser',managerUserRouter);
app.use('/Category',categoryRouter);
app.use('/createSubCategory', subCategoryRouter)
