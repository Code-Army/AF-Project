import React, {Component} from "react";
import axios from "axios";


export default class Details extends Component{

    constructor(props) {
        super(props);

        // const productId = props.match.params.productId
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            userId: 1,
            productId:"pop",
            price:0,
            quantity:0,
            total:0
        }
    }

    onChangeUsername(e) {
        this.setState({
            quantity: e.target.value
        })
    }


    handleClick(e) {

        const amount = this.props.price * this.state.quantity;

        const cart = {
            userId: this.state.title,
            productId:this.props.productId,
            productName:this.props.productName,
            price:this.props.price,
            quantity: this.state.quantity,
            total: amount
        }

        console.log(cart);

        axios.post('http://localhost:5000/cart/add', cart)
            .then(res => console.log(res.data));

        this.setState({
            product: ''
        })
    }

    render() {
        return (
            <div>
                <div className="s_product_text">
                    <h3>{this.props.title}</h3>
                    <h2>$149.99</h2>
                    <input type="hidden" value={this.state.price}/>
                    <ul className="list">
                        <li>
                            <a className="active" href="#">
                                <span>Category</span> : Household</a
                            >
                        </li>
                        <li>
                            <a href="#"> <span>Availibility</span> : In Stock</a>
                        </li>
                    </ul>
                    <p>
                        Mill Oil is an innovative oil filled radiator with the most
                        modern technology. If you are looking for something that can
                        make your interior look awesome, and at the same time give you
                        the pleasant warm feeling during the winter.
                    </p>
                    <div className="product_count">
                        <label htmlFor="qty">Quantity:</label>
                        <input
                            type="text"
                            name="qty"
                            id="sst"
                            maxLength="12"
                            value={this.state.quantity}
                            onChange={this.onChangeUsername}
                            title="Quantity:"
                            className="input-text qty"
                        />
                        <button

                            className="increase items-count"
                            type="button"
                        >
                            <i className="lnr lnr-chevron-up"></i>
                        </button>
                        <button

                            className="reduced items-count"
                            type="button"
                        >
                            <i className="lnr lnr-chevron-down"></i>
                        </button>
                    </div>
                    <div className="card_area">
                        <a className="main_btn" href="#" onClick={this.handleClick}>Add to Cart</a>
                        <a className="icon_btn" href="#">
                            <i className="lnr lnr lnr-diamond"></i>
                        </a>
                        <a className="icon_btn" href="#">
                            <i className="lnr lnr lnr-heart"></i>
                        </a>
                    </div>
                </div>
            </div>
        )

    }


}