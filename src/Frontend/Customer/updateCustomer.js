
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditCustomer extends Component {
    constructor(props) {
        super(props);

        this.onChangecFirstname = this.onChangecFirstname.bind(this);
        this.onChangecLastname = this.onChangecLastname.bind(this);
        this.onChangecemail = this.onChangecemail.bind(this);
        this.onChangecpassword = this.onChangecpassword.bind(this);
        this.onChangecbirthday = this.onChangecbirthday.bind(this);
        this.onChangecContactNo =this.onChangecContactNo.bind(this);
        this.onChangecGender = this.onChangecGender.bind(this);
        this.onChangecAddress= this.onChangecAddress.bind(this);
        this.onChangecStreet = this.onChangecStreet.bind(this);
        this.onChangecZipcode = this.onChangecZipcode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            cFirstname:'',
            cLastname:'',
            cemail: 0,
            cbirthday: new Date(),
            cContactNo:'',
            cGender:'',
            cAddress:'',
            cStreet:'',
            cZipcode:'',
            customer: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/customer/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    cFirstname: response.data.cFirstname,
                    cLastname: response.data.cLastname,
                    cemail: response.data.cemail,
                    cpassword:response.data.cpassword,
                    cbirthday: new Date(response.data.cbirthday),
                    cContactNo: response.data.cContactNo,
                    cGender: response.data.cGender,
                    cAddress: response.data.duration,
                    cStreet: response.data.cStreet,
                    cZipcode: response.data.cZipcode
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/customers/')
            .then(response => {
                this.setState({ customers: response.data.map(customer => customer.cFirstName) });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangecFirstname(e){
        this.setState({
            cFirstname:e.target.value
        })
    }

    onChangecLastname(e){
        this.setState({
            cLastname:e.target.value
        })
    }

    onChangecemail(e){
        this.setState({
            cemail:e.target.value
        })
    }

    onChangecpassword(e){
        this.setState({
            cpassword:e.target.value
        })
    }

    onChangecbirthday(e){
        this.setState({
            cbirthday:e.target.value
        })
    }

    onChangecGender(e){
        this.setState({
            cGender:e.target.value
        })
    }

    onChangecContactNo(e){
        this.setState({
            cContactNo:e.target.value
        })
    }

    onChangecAddress(e){
        this.setState({
            this.onChangecAddress():e.target.value
        }
    )}

    onChangecStreet(e){
        this.setState({
            this.this.onChangecStreet():e.target.value
    }
    )}

    onChangecZipcode(e){
        this.setState({
            this.this.onChangecStreet():e.target.value
    }
    )}
}


    onSubmit(e) {
        e.preventDefault();

        const customer = {
            cFirstname: this.state.cFirstname,
            cLastname: this.state.cLastname,
            cemail: this.state.cLastname,
            cpassword: this.state.cpassword,
            cbirthday: this.state.cbirthday,
            cGender: this.state.cGender,
            cContactNo: this.state.cContactNo,
            cAddress:this.state.cAddress,
            cStreet:this.state.cStreet,
            cZipcode:this.state.cZipcode
              };

        console.log(customer);

        axios.post('http://localhost:5000/customer/update/'+this.props.match.params.id, customer)
            .then(res => console.log(res.data));

        window.location = '/';
    }

render(){
    return(

        <div className="col-md-9">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <h4>Your Profile</h4>
                            <hr>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <div className="myform form ">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" name="cFirstname" className="form-control my-input" id="cFirstname"
                                               placeholder="SandaLatha" value={this.state.cFirstName}
                                               onChange={this.onChangecFirstname}>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="cLastname" className="form-control my-input" id="cLastname"
                                               placeholder="Amarabandu" value={this.state.cLastname}
                                               onChange={this.onChangecLastname}>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="cemail" className="form-control my-input" id="cemail"
                                               placeholder="Sirisena@gmail.com" value={this.state.cemail} onChange={this.onChangecemail} >
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="cpassword" className="form-control my-input" id="cpassword"
                                               placeholder="Guess me..." value={this.state.cpassword} onChange={this.onChangecpassword}>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <input type="Date" min="0" name="cbirthday" id="cbirthday" className="form-control my-input"
                                               placeholder="Phone" value={this.state.cbirthday} onChange={this.onChangecbirthday}>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label>Gender:</label><br/>
                                            <label><input type="radio" name="cGender" required value="Male" onChange={this.onChangecGender} /> Male</label>
                                            <label><input type="radio" name="cGender" required value="Female" onChange={this.onChangecGender} /> Female</label>
                                            <label><input type="radio" name="cGender" required value="Other" onChange={this.onChangecGender} /> Other</label>
                                            <span className="Error"></span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input type="number" min="0" name="cContactNo" id="cContactNo" className="form-control my-input"
                                               placeholder="Phone" value={this.state.cContactNo} onChange={this.onChangecContactNo}>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Submit" className="btn btn-info btn-block rounded py-2">
                                        </input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>




    )
}