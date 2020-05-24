import React,{Component, useState} from "react";

import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-bootstrap/Modal'

import axios from "axios";

export default class ProductRow extends Component{

    constructor(props) {
        super(props);
        this.deleteOrder = this.deleteOrder.bind(this)
        this.state = {
            show:false,
            delModel:false,
            rating: 1,
            feedbackTxt:"",
            delId:''

        }
    }

    handleshow = (e)=>{
        this.setState({
            show:true
        })
        console.log("pop")
    }

    handle = (e)=>{

        console.log("pop")
    }

    handleclose = (e)=>{
        this.setState({
            show:false,
            delModel:false
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

    updateStatus=(e)=>{

        this.setState({
            show:true
        })
        console.log(this.props.item._id)
        const myOrder = {
           status:"complete"

        }

        axios.post('http://localhost:5000/orders/update/'+this.props.item._id, myOrder)
            .then(res => console.log(res.data));
        console.log("order added sucessfully")
    }

    addFeedback(){
        console.log(this.props.item.productId)

        const feedback = {

            productId:this.props.item.productId,
            feedback:this.state.feedbackTxt,
            rate:this.state.rating,
            userName:this.props.userName

        }

        axios.post('http://localhost:5000/feedback/add', feedback)
            .then(res => console.log(res.data));

        this.setState({
            show:false,
            rating: 1,
            feedbackTxt:""
        })
    }

    ConfirmDelete(){
        axios.delete('http://localhost:5000/orders/'+this.state.delId)
            .then(response => { console.log(response.data)});

        this.setState({

            delModel:false
        })
    }



    deleteOrder(id){
        this.setState({
            delModel:true,
            delId:id
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

                                    <span className="badge badge-danger" onClick={() => { this.deleteOrder(this.props.item._id) }}> <i className="fas fa-trash"></i></span>
                                </div>
                            </div>
                            <div>
                                <div className="product_image">
                                    <img
                                        src={this.props.item.img}

                                    />
                                </div>
                            </div>
                            <div className="product_name_container">
                                <div className="product_name"><a href={`/products/${this.props.item.productId}`}>{this.props.item.productName}</a></div>
                                <div className="product_text">Purchase Date - {this.props.item.createdAt}</div>
                            </div>
                        </div>

                        {/*<div className="product_price product_text">*/}
                        {/*    <button type="button" className="btn btn-success"*/}
                        {/*            onClick={this.handleshow.bind(this)}>Conform*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        {this.props.item.status === "pending"? <div className="product_price product_text">
                            <button type="button" className="btn btn-success"
                                   onClick={this.updateStatus.bind(this)} >Confirm
                            </button>
                        </div> : <div className="product_price product_text">
                            <button onClick={this.handleshow.bind(this)} type="button" className="btn btn-success"
                            >feedback
                            </button>
                        </div> }


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
                        <button className="btn btn-primary" variant="secondary" type="submit" onClick={this.addFeedback.bind(this)}>
                            Save
                        </button>

                        <button className="btn btn-danger" variant="primary" onClick={this.handleclose.bind(this)}>
                            Cancel
                        </button>

                    </Modal.Footer>
                </Modal>


                <Modal show={this.state.delModel} onHide={this.handleclose.bind(this)} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>MY ORDER DELETE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do You Want Delete This Item ?</Modal.Body>
                    <Modal.Footer>
                        <button  class="btn btn-primary" onClick={this.handleclose.bind(this)}>
                            Cancel
                        </button>
                        <button class="btn btn-danger" onClick={this.ConfirmDelete.bind(this)} >
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>

            </div>


        )
    }

}
