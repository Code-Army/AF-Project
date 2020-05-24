import React, { Component } from 'react';

//Admin Components
import CreateAdminUser from "./admin/createAdminUser";
import CreateCategory from "./category/CreateCategory";
import CreateSubCategory from "./category/CreateSubCategory";
import AllUsers from "./admin/DisplayAllCustomers";
import AllCategory from "./category/AllCategory";
import AllSubCategories from "./category/AllSubCategories";


//Manager
import AddProduct from "./manager/addproduct.component";
import AddDiscount from "./manager/adddisscount.component";
import AddCoupon from "./manager/addcoupon.component";
import ProductList from "./manager/product-list.component";
import Coupon from "./manager/coupondiscounts.component";
import Discount from "./manager/discounts.component";

import EditProduct from "./manager/editproduct.component"
import AllOrders from "./manager/AllOrders.component";


class BackendHome extends Component {
    constructor(props) {


        super(props);

        const user = sessionStorage.user && JSON.parse(sessionStorage.user);

        this.logout = this.logout.bind(this);
        this.onNavBarClick = this.onNavBarClick.bind(this);

        this.state = {
            user: {
                name: (user && user.name),
                role: (user && user.role),
                page: '',
                test:''
            }
        }
    }

    componentDidMount() {


        const s = document.createElement('script');
        s.type = 'text/javascript';


        s.src="./../js/test.js";
        s.async = true;
        document.body.appendChild(s);

        const user = this.state.user && this.state.user.name
        if (!user) {
            this.props.history.push('/admin/login')
        }
    }

    onNavBarClick(e) {

        this.props.history.push('/admin')
        this.setState({
            page: e.target.innerText
        })
    }

    ClickEdit(){


        this.setState({
            test: "pop"
        })
    }
    logout = () => {


        sessionStorage.removeItem('user');
        sessionStorage.removeItem('auth-token');
        this.props.history.push('/admin/login')
    }




    render() {



        const user = this.state.user && this.state.user.name
        const role = this.state.user && this.state.user.role
        var page = this.state.page
        const component =""
        let adminComponent;
        let navlink;

        if (this.props.match.params.component){
            console.log(this.props.match.params.component)

            if (this.props.match.params.component == "product"){
                page = "EditProduct";
            }

        }




        if (role === 'storemanager') {
            navlink =
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">

                        

                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link" >
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Product
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a  className="nav-link" onClick={this.onNavBarClick}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Product List</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.onNavBarClick}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add Product</p>
                                    </a>
                                </li>

                            </ul>
                        </li>



                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link" >
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Discount
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a  className="nav-link" onClick={this.onNavBarClick}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Discount List</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.onNavBarClick}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add Discount</p>
                                    </a>
                                </li>

                            </ul>
                        </li>


                        <li className="nav-item has-treeview">
                            <a href="#" className="nav-link" >
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    Coupon
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a  className="nav-link" onClick={this.onNavBarClick}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Coupon List</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.onNavBarClick}>
                                        <i className="far fa-circle nav-icon"></i>
                                        <p>Add Coupon</p>
                                    </a>
                                </li>

                            </ul>
                        </li>


                        <li className="nav-item">
                            <a onClick={this.onNavBarClick} className="nav-link">

                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    All Orders
                                    <span className="right badge badge-danger"></span>
                                </p>
                            </a>
                        </li>



                    </ul>
                </nav>


            if (page === 'Product List')
                adminComponent = <ProductList
                ClickEdit={this.ClickEdit}/>
            else if (page === 'Add Product')
                adminComponent = <AddProduct />
            else if (page === 'EditProduct')
                adminComponent = <EditProduct id={this.props.match.params.id} />

            else if (page === 'Coupon List')
                adminComponent = <Coupon />
            else if (page === 'Add Coupon')
                adminComponent = <AddCoupon />

            else if (page === 'Discount List')
                adminComponent = <Discount />
            else if (page === 'Add Discount')
                adminComponent = <AddDiscount />


            else if (page === 'All Orders')
                adminComponent = <AllOrders />
            else//dashboard
                adminComponent = <ProductList />
        }
        else {
            navlink =
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


                        <li class="nav-item">
                            <a onClick={this.onNavBarClick} class="nav-link">

                                <i class="nav-icon fas fa-th"></i>
                                <p>
                                    Admin
                                    <span class="right badge badge-danger"></span>
                                </p>
                            </a>
                        </li>


                        <li className="nav-item">
                            <a onClick={this.onNavBarClick} className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>Category<span className="right badge badge-danger"></span>
                                </p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a onClick={this.onNavBarClick} className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    All Category
                                    <span className="right badge badge-danger"></span>
                                </p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a onClick={this.onNavBarClick} className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Sub Category
                                    <span className="right badge badge-danger"></span>
                                </p>
                            </a>
                        </li>



                        <li className="nav-item">
                            <a onClick={this.onNavBarClick} className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    All Sub Category
                                    <span className="right badge badge-danger"></span>
                                </p>
                            </a>
                        </li>
                        

                        <li className="nav-item">
                            <a onClick={this.onNavBarClick} className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                   All Users
                                    <span className="right badge badge-danger"></span>
                                </p>
                            </a>
                        </li>

                    </ul>
                </nav>


            if (page === 'Category')
                adminComponent = <CreateCategory />
            else if (page === 'All Category')
                adminComponent = <AllCategory />
            else if (page === 'Sub Category')
                adminComponent = <CreateSubCategory /> 
            else if (page === 'All Sub Category')
                adminComponent = <AllSubCategories />
            else if (page === 'All Users')
                adminComponent = <AllUsers />
            else
                adminComponent = <CreateAdminUser />
        }

        if (user) {
            return (

                <div id="myDiv">

                    <div class="wrapper">


                        <nav class="main-header navbar navbar-expand navbar-white navbar-light">

                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                                </li>

                                <li class="nav-item d-none d-sm-inline-block">
                                    <a href="#" onClick={this.logout} class="nav-link">Logout</a>
                                </li>
                            </ul>




                        </nav>


                        <aside class="main-sidebar sidebar-dark-primary elevation-4">

                            <a href="index3.html" class="brand-link">
                                <img src="./../img/storelogo.png" alt="Dress Me " class="brand-image img-circle elevation-3"
                                />
                                <span class="brand-text font-weight-light">Store</span>
                            </a>


                            <div class="sidebar">
                                <h6 className="m-0 text-white lnr-text-align-center">Hi : {user}</h6>



                                {navlink}

                            </div>

                        </aside>


                        <div class="content-wrapper">

                            <div class="content-header">
                                <div class="container-fluid">
                                    <div class="row mb-2">
                                        <div class="col-sm-6">
                                            <h1 class="m-0 text-dark">Dashboard</h1>
                                        </div>
                                        <div class="col-sm-6">
                                            <ol class="breadcrumb float-sm-right">

                                                <li class="breadcrumb-item active">{role === 'storemanager' ? 'Store Manager Dashboard' : 'Admin Dashboard'}</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <section class="content">
                                <div class="container-fluid">

                                    {adminComponent}

                                </div>
                            </section>

                        </div>

                        <footer class="main-footer">
                            <strong><a href="http://adminlte.io">Code Army</a>.</strong>
                            All rights reserved.
                            <div class="float-right d-none d-sm-inline-block">
                                <b>AF</b> Group Project
                            </div>
                        </footer>


                        <aside class="control-sidebar control-sidebar-dark">

                        </aside>

                    </div>

                </div>
            )
        } else {
            return <h1>No page for you!</h1>
        }
    }
}

export default BackendHome;