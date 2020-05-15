import React, { Component } from 'react';
import axios from "axios";
import Modal from "react-bootstrap/Modal";

export default class adddiscount extends Component {
    constructor(props) {
        super(props);

        this.onChangeDisName = this.onChangeDisName.bind(this);
        this.onChangeDisPercent = this.onChangeDisPercent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);



        this.state = {
            discountname : '',
            discountprecentage : '',
            show:false

        }

    }
    handleClose(){
        this.setState({
            show:false

        })
        // window.location='/discount'
    }
    handleShow(){
        this.setState({
            show:true
        })
    }
    componentDidMount()
    {axios.get('http://localhost:5000/discounts/')
        .then(response => {
            if(response.data.length > 0 ) {
                this.setState({
                    discount : response.data.map(discount => discount.discountname),
                    discountname : response.data[0].discountname

                })
            }
        })
    }


    onChangeDisName(e){
        this.setState({
            discountname: e.target.value
            }
        )
    }
    onChangeDisPercent(e){
        this.setState({
            discountprecentage: e.target.value
            }
        )
    }
    onSubmit(e){
        e.preventDefault();
        const discount =  {
            discountname : this.state.discountname,
            discountprecentage : this.state.discountprecentage,

        }
        axios.post('http://localhost:5000/discounts/add' , discount )
            .then(res => console.log(res.data));

        console.log(discount)
        this.handleShow();
        this.setState({
            discountname : "",
            discountprecentage : 0
        })
    }
    backtoDiscount(){
        window.location = '/discount';
    }
    render() {
        return (

            <div className='container'>
                <h3 className="ml-3">Create New discount Log</h3>

                <form onSubmit={this.onSubmit} className="ml-5 mr-5">
                    <div className="form-group">
                        <label>discount Name</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.discountname}
                               onChange={this.onChangeDisName}>


                        </input>

                    </div>

                    <div className="form-group">
                        <label>discount percentage :</label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.discountprecentage}
                               onChange={this.onChangeDisPercent}
                        />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Create discount Log" className="btn btn-primary"/>
                        <input type="submit" value="Back to discounts" className="btn btn-dark ml-3" onClick={this.backtoDiscount}/>

                    </div>



                </form>
                <Modal show={this.state.show}>
                    <Modal.Header closeButton>
                        <Modal.Title>notofication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>data inserted successfully.</Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" className="btn btn-success " onClick={this.handleClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }




}