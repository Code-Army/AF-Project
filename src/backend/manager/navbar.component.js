import React, {Component} from "react";
import {Link} from 'react-router-dom';

class Navbar extends Component{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <Link to="/" className="navbar-brand mb-0 h1 text-white" >Navbar</Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to="/products">Products <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link text-white" to="/create">Add Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/edit/:id">Edit Product</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled text-white" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
        }

}
export default Navbar