import React, { Component } from 'react';
//import './CSS/backendHome.css'
import axios from "axios";
import { BrowserRouter, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";

import { Navbar, Nav,Form, Button, FormControl } from 'react-bootstrap';


//Admin Components
import CreateAdminUser from "./admin/createAdminUser";
import CreateCategory from "./category/CreateCategory";
import CreateSubCategory from "./category/CreateSubCategory";

//Manager Components
import ProductList from "./manager/product-list.component";

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
            }
        }
    }

    componentDidMount() {
        const user = this.state.user && this.state.user.name
        if (!user) {
            this.props.history.push('/admin/login')
        }
    }

    onNavBarClick(eventKey, event) {
        console.log('123' + eventKey)

        this.setState({
            page: eventKey
        })
    }

    logout = () => {
        console.log('abc')

        this.setState(
            {

            }
        )

        sessionStorage.removeItem('user');
        sessionStorage.removeItem('auth-token');
        this.props.history.push('/admin/login')
    }



    render() {
        const user = this.state.user && this.state.user.name
        const role = this.state.user && this.state.user.role
        const page = this.state.page

        console.log(user, role)

        let adminComponent;
        let navlink;

        if (role === 'storemanager') {
            navlink =
                <Nav className="mr-auto">
                    <Nav.Link onSelect={this.onNavBarClick} eventKey='product'>Product</Nav.Link>
                </Nav>
            adminComponent = <ProductList />
        }
        else {
            navlink =
                <Nav className="mr-auto">
                    <Nav.Link onSelect={this.onNavBarClick} eventKey='admin'>Admin</Nav.Link>
                    <Nav.Link onSelect={this.onNavBarClick} eventKey='category'>Category</Nav.Link>
                    <Nav.Link onSelect={this.onNavBarClick} eventKey='subcategory'>Sub Category</Nav.Link>
                </Nav>
            if (page === 'category')
                adminComponent = <CreateCategory />
            else if (page === 'subcategory')
                adminComponent = <CreateSubCategory />
            else
                adminComponent = <CreateAdminUser />
        }

        if (user) {
            return (
                <div>
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand>{role === 'storemanager' ? 'Store Manager Dashboard' : 'Admin Dashboard'}</Navbar.Brand>
                        {navlink}
                        <Form inline>
                            <h5 id="user-name">Hi {user}</h5>
                            <Button onClick={this.logout} variant="outline-light">Log out</Button>
                        </Form>
                    </Navbar>
                    {adminComponent}

                </div>
            )
        } else {
            return <h1>No page for you!</h1>
        }
    }
}

export default BackendHome;