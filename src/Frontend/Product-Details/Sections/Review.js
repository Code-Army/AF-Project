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
                                    <h4>{this.props.avarage}</h4>
                                    <h6>({this.props.fTotal} Reviews)</h6>
                                </div>
                            </div>
                            <div className="col-6">

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



                                        {this.props.feedback.map((feedback,i)=> {

                                            var cards = [];

                                            for (var i = 0; i < feedback.rate; i++) {

                                                cards[i] = (<span className="busterCards"><i className="fa fa-star"></i></span>);
                                            }

                                            return(
                                                <div>
                                                    <p><h4>{feedback.userName}</h4>{cards}<br/>{feedback.feedback}<br/></p>
                                                    <hr/>



                                                </div>

                                            );
                                        })}


                                        {cards}



                                        <p></p>
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