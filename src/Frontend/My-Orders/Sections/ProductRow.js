import React,{Component, useState} from "react";
import img1 from "../../../img/cartimg.jpg"
import StarRatingComponent from 'react-star-rating-component';
import Modal from 'react-bootstrap/Modal'
import StarRating from "./StartRating";

export default function ProductRow(props) {
    const [show, setShow] = useState(false);
    const [value, setvalue] = useState(2);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   function addFeedback(){
       console.log(setvalue)
    }
    var rr = 2;
   function onStarClick(nextValue, prevValue, name) {
        rr = nextValue;
       console.log(nextValue);
      // const [value, setvalue] = useState(nextValue);
    }

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
                            <div className="product_name"><a href="product.html">fsdfsd</a></div>
                            <div className="product_text">Second line for additional info</div>
                        </div>
                    </div>

                    <div className="product_price product_text"><button type="button" class="btn btn-success" onClick={handleShow}>Conform</button></div>
                    <div className="product_color product_text"></div>
                    <div className="product_size product_text"></div>


                </li>
            </ul>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                    <div className="form-group">
                        <p>Rate Product</p>
                        <StarRatingComponent
                            name="rate1"
                            starCount={10}
                            value={value}
                            onStarClick={onStarClick}
                        />
                        <p>Feedback</p>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={setvalue}></textarea>

                    </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" variant="secondary"  onClick={addFeedback()}>
                        Yes
                    </button>

                    <button className="btn btn-primary" variant="primary" onClick={handleClose}>
                        No
                    </button>
                </Modal.Footer>
            </Modal>


        </div>


    )
}
