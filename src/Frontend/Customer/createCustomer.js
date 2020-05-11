import React, {Component} from 'react';
import axios from 'axios';

class createCustomer extends Component {
    constructor(props) {
        super(props);

        this.onchangecFirstname = this.onchangecFirstname.bind(this);
        this.onchangecLastname = this.onchangecLastname.bind(this);
        this.onchangecemail = this.onchangecemail.bind(this);
        this.onchangecpassword = this.onchangecpassword.bind(this);
        this.onchangecbirthday = this.onchangecbirthday.bind(this);
        this.onchangecContactNo =this.onchangecContactNo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            cFirstname:'',
            cLastname:'',
            cemail:'',
            cpassword:'',
            cbirthday:new Date(),
            cGender:'',
            cContactNo:0,
            customer:[]

        }
    }

    onchangecFirstname(e){
        this.setState({
            cFirstname:e.target.value
        })
    }

    onchangecLastname(e){
        this.setState({
            cLastname:e.target.value
        })
    }

    onchangecemail(e){
    this.setState({
        cemail:e.target.value
    })
}

    onchangecpassword(e){
    this.setState({
        cpassword:e.target.value
    })
}

    onchangecbirthday(e){
    this.setState({
        cbirthday:e.target.value
    })
}

    onchangecContactNo(e){
    this.setState({
        cContactNo:e.target.value
    })
}

    onSubmit(e){
        e.preventDefault();

        const newcustomer = {
            cFirstname:this.state.cFirstname,
            cLastname:this.state.cLastname,
            cemail:this.state.cemail,
            cpassword:this.state.cpassword,
            cbirthday:this.state.cbirthday,
            cContactNo:this.state.cContactNo,
        }
        console.log(this.state.cFirstname)
        console.log(this.state.cemail)

        this.setState(
            {
                cFirstname:'',
                cLastname:'',
                cemail:'',
                cpassword:'',
                cbirthday:'',
                cGender:'',
                cContactNo:''
            }
        )


        axios.post('http://localhost:5000/customer/createCustomer/add'
            , newcustomer).then(res => console.log(res.data));
    }
render() {
    return (
        <div className="container">
            <div className="col-md-6 mx-auto text-center">
                <div className="header-title">
                    <h1 className="wv-heading--title">
                        Check out — it’s free!
                    </h1>
                    <h2 className="wv-heading--subtitle">
                        Register...
                    </h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div className="myform form ">
                        <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                                <input type="text" name="cFirstname" className="form-control my-input" id="cFirstname"
                                       placeholder="SandaLatha" value={this.state.cFirstName}
                                       onChange={this.onchangecFirstname}>
                                </input>
                        </div>
                        <div className="form-group">
                                <input type="text" name="cLastname" className="form-control my-input" id="cLastname"
                                       placeholder="Amarabandu" value={this.state.cLastname}
                                       onChange={this.onchangecLastname}>
                             </input>
                        </div>
                            <div className="form-group">
                                <input type="email" name="cemail" className="form-control my-input" id="cemail"
                                       placeholder="Sirisena@gmail.com" value={this.state.cemail}
                                       onChange={this.onchangecemail} >
                             </input>
                        </div>
                            <div className="form-group">
                                <input type="password" name="cpassword" className="form-control my-input" id="cpassword"
                                       placeholder="Doggysun" value={this.state.cpassword}
                                       onChange={this.onchangecpassword}>
                             </input>
                        </div>
                            <div className="form-group">
                                <input type="Date" min="0" name="cbirthday" id="cbirthday" className="form-control my-input"
                                       placeholder="Phone" value={this.state.cbirthday}
                                       onChange={this.onchangecbirthday} >
                             </input>
                        </div>
                            <div className="form-group">
                                <input type="number" min="0" name="cContactNo" id="cContactNo" className="form-control my-input"
                                       placeholder="Phone" value={this.state.cContactNo}
                                       onChange={this.onchangecContactNo} >
                             </input>
                        </div>  
                                <div className="form-group">
                                            <input type="submit" value="Submit" className="btn btn-info btn-block rounded py-2">
                                            </input>      
                                </div>
                            
                            {/* <div className="form-group">
                                <a className="btn btn-block g-button" href="#">
                                    <i className="fa fa-google"></i> Sign up with Google
                                </a>
                            </div>
                            <p className="small mt-3">By signing up, you are indicating that you have read and agree to
                                the <a href="#" className="ps-hero__content__link">Terms of Use</a> and <a href="#">Privacy
                                    Policy</a>.
                            </p> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
}
export default createCustomer;