import React, {Component} from "react";
import StarRatingComponent from 'react-star-rating-component';

export default class Review extends Component{

    constructor(props) {
        super(props);

        this.state = {
            feedback:"",
            rate:2
        }


        console.log(this.state.rate)
    }

    componentDidMount(){

            this.setState({
                rate: this.props.rate
            })

    }


    render() {

        var numberOfCards = 8; // or more
        var cards = [];

        for (var i = 0; i < this.props.rate; i++) {
            cards[i] = (<span className="busterCards"><i className="fa fa-star"></i></span>);
        }

        return (
            <div
                className="tab-pane fade show active"
                id="review"
                role="tabpanel"
                aria-labelledby="review-tab">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row total_rate">
                            <div className="col-6">
                                <div className="box_total">
                                    <h5>Overall</h5>
                                    <h4>4.0</h4>
                                    <h6>(03 Reviews)</h6>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="rating_list">
                                    <h3>Based on 3 Reviews</h3>
                                    <ul className="list">
                                        <li>
                                            <a href="#"
                                            >5 Star
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i> 01</a
                                            >
                                        </li>
                                        <li>
                                            <a href="#"
                                            >4 Star
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i> 01</a
                                            >
                                        </li>
                                        <li>
                                            <a href="#"
                                            >3 Star
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i> 01</a
                                            >
                                        </li>
                                        <li>
                                            <a href="#"
                                            >2 Star
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i> 01</a
                                            >
                                        </li>
                                        <li>
                                            <a href="#"
                                            >1 Star
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i> 01</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="review_list">
                            <div className="review_item">
                                <div className="media">
                                    <div className="d-flex">
                                        <img
                                            src="img/product/single-product/review-1.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="media-body">
                                        <h4>Blake Ruiz</h4>

                                        {/*<table>*/}
                                        {/*    { Array(this.state.rate).fill(<i className="fa fa-star"></i>) }*/}
                                        {/*</table>*/}

                                        {/*{Array.apply(null, Array(this.props.rate)).map((i)=>*/}
                                        {/*    <p>adad</p>*/}
                                        {/*)}*/}
                                        {cards}



                                        <p>{this.props.feedback}dfghsdjkfhskjhfksdhfkjhsdkfhskdjfhksdjfhkjshfdkjh{this.props.rate}</p>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        )
    }



}