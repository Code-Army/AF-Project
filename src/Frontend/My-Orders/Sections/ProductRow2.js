import React,{Component, useState} from "react";
import img1 from "../../../img/cartimg.jpg"
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-bootstrap/Modal'
import StarRating from "./StartRating";
import axios from "axios";

export default class ProductRow extends Component{

    constructor() {
        super();

        this.state = {
            show:false,
            rating: 1,
            feedbackTxt:""
        }
    }

    handleshow = (e)=>{
        this.setState({
            show:true
        })
        console.log("pop")
    }

    handleclose = (e)=>{
        this.setState({
            show:false
        })
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        console.log(nextValue)
    }

    handleFeedbackTest=(e)=>{
        this.setState({
            feedbackTxt:e.target.value
        });

    }

    addFeedback(){
        console.log(this.props.item.productId)

        const feedback = {

            productId:this.props.item.productId,
            feedback:this.state.feedbackTxt,
            rate:this.state.rating

        }

        axios.post('http://localhost:5000/feedback/add', feedback)
            .then(res => console.log(res.data));

        this.setState({
            show:false,
            rating: 1,
            feedbackTxt:""
        })
    }

    render() {

        return (

            <div className="cart_items">
                <ul className="cart_items_list">


                    <li className="cart_item item_list d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-lg-end justify-content-start">
                        <div
                            className="product d-flex flex-lg-row flex-column align-items-lg-center align-items-start justify-content-start mr-auto">
                            <div>

                                <div className="product_number">


                                </div>
                            </div>
                            <div>
                                <div className="product_image">
                                    <img
                                        src={img1}

                                    />
                                </div>
                            </div>
                            <div className="product_name_container">
                                <div className="product_name"><a href="product.html">{this.props.item.productId}</a></div>
                                <div className="product_text">Second line for additional info</div>
                            </div>
                        </div>

                        <div className="product_price product_text"><button type="button" class="btn btn-success" onClick={this.handleshow.bind(this)}>Conform</button></div>
                        <div className="product_color product_text"></div>
                        <div className="product_size product_text"></div>


                    </li>
                </ul>

                <Modal show={this.state.show} onHide={this.handleclose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Feedback</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                            <div className="form-group">
                                <p>Rate Product</p>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={this.state.rating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                                <p>Feedback</p>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleFeedbackTest.bind(this)}></textarea>

                            </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" variant="secondary" type="submit" onClick={this.addFeedback.bind(this)}>
                            Yes
                        </button>

                        <button className="btn btn-primary" variant="primary" onClick={this.handleclose.bind(this)}>
                            No
                        </button>

                    </Modal.Footer>
                </Modal>


            </div>


        )
    }

}
