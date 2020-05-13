import React, {Component} from "react";
import {Link} from 'react-router-dom';

class Navbar extends Component{
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-dark">
                <Link to="/" className="navbar-brand text-white" >Navbar</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link className="nav-link text-white" to="/products">Products <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link text-white " to="/create">Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/edit/:id">Edit Product</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled " href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
        }

}
export default Navbar