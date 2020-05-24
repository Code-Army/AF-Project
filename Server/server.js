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


// app.use("/product", require("../Server/routes/products"));

//const managerUserRouter = require('./routes/managerUser');

// app.use('/customer',customer);





//PASAN
const FeedbackRouter  = require('./routes/feedback')
app.use('/feedback',FeedbackRouter);

const CartRouter  = require('./routes/cart')
app.use('/cart',CartRouter);

const PurchasesRouter  = require('./routes/purches')
app.use('/purchases',PurchasesRouter);

const BillingRouter  = require('./routes/billing')
app.use('/billing',BillingRouter);

const OrderRouter  = require('./routes/ordersLst')
app.use('/orders',OrderRouter);

const ProductRouter  = require('./routes/product')
app.use('/product',ProductRouter);

const CommentRouter  = require('./routes/comment')
app.use('/comment',CommentRouter);

//MADU
const productRouter = require('./routes/products');
app.use('/products',productRouter);

const discountRouter = require('./routes/discounts');
app.use('/discounts',discountRouter);

const couponRouter = require('./routes/coupons');
app.use('/coupons',couponRouter);

//UMESHA
const adminUserRouter = require('./routes/adminUser');
app.use('/createAdminUser',adminUserRouter);

const  categoryRouter = require('./routes/category');
app.use('/Category',categoryRouter);

const subCategoryRouter = require('./routes/subCategory');
app.use('/SubCategory', subCategoryRouter)

const wishListRouter = require('./routes/wishlist');
app.use('/wishlist', wishListRouter)

//KUSAL
const Users = require('./routes/Users')
app.use('/users', Users)

