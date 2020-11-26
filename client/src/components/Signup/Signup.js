import React, { Component } from "react";
import 'whatwg-fetch'
import { Dropdown, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css'

//customer function
import {getFromStorage, setInStorage} from "../../utils/storage";
import {Link} from "react-router-dom";

//server endpoint
const ENDPOINT = 'http://localhost:5000';
// const ENDPOINT = 'https://rt-chatwebapp.herokuapp.com/';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading: true,
            signUpError: '',
            masterError: '',
            signUpPassword:'',
            signUpFirstName:'',
            signUpLastName:'',
            signUpEmail:'',
            signUpAgegroup: ''
        };

        this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);

        this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
        this.onSignup = this.onSignup.bind(this);
        this.onSelectItemChangeAgegroup = this.onSelectItemChangeAgegroup.bind(this);
    }

    componentDidMount() {

        //verify if has a user account login already and login automatically
        const obj = getFromStorage('user_token');

        if(obj && obj.token){
            const { token } = obj;

            //verify token by fetch user collection from db
            fetch(ENDPOINT+'/api/account/userverify?token='+token)
                .then(res => res.json())
                .then(json => {
                    if(json.success){
                        this.setState({
                            token,
                            isLoading: false
                        });
                    } else{
                        this.setState({
                            isLoading:false
                        })
                    }
                });
        }else {
            this.setState({
                isLoading: false,
            });
        }
    }

    onTextboxChangeSignUpFirstName(event)
    {
        this.setState({
            signUpFirstName: event.target.value,
        })
    }

    onTextboxChangeSignUpLastName(event)
    {
        this.setState({
            signUpLastName: event.target.value,
        })
    }

    onTextboxChangeSignUpEmail(event)
    {
        this.setState({
            signUpEmail: event.target.value,
        })
    }

    onTextboxChangeSignUpPassword(event)
    {
        this.setState({
            signUpPassword: event.target.value,
        })
    }

    onSelectItemChangeAgegroup(event)
    {
        this.setState({
            signUpAgegroup: event.target.value,
        })

        console.log("selectitem", event.target.value)
    }

    onSignup()
    {
        //grab state
        const{
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword,
            signUpAgegroup
        } = this.state;

        this.setState({
            isLoading:true,
        })
        //post request to backup
        fetch(ENDPOINT + '/api/account/signup', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                firstName: signUpFirstName,
                lastName: signUpLastName,
                email: signUpEmail,
                password: signUpPassword,
                agegroup:signUpAgegroup
            })
        }).then(res => res.json())
            .then(json => {
                if(json.success){

                    this.setState(
                        {
                            signUpError:json.message,
                            isLoading: false,
                            signUpLastName:'',
                            signUpPassword:'',
                            signUpEmail:'',
                            signUpFirstName:'',
                            signUpAgegroup: ''
                        });
                }else{
                    this.setState(
                        {
                            signUpError:json.message,
                            isLoading: false
                        });
                }
            });
    }

    render() {
        const {
            isLoading,
            signUpError,
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword,
            signUpAgegroup
        } = this.state

        if (isLoading){
            return(<div><p>Loading...</p></div>)
        }

        if (signUpError == ''){
            return(
                <div className="signupOuterContainer">

                    <div className= "signupInnerContainer">
                        {
                            (signUpError)?(<p>{signUpError}</p>) : null
                        }
                        <h1 className="heading">Sign Up</h1>
                        <input type="text" placeholder="firstname" className="signupInput"
                               value={signUpFirstName}
                               onChange={this.onTextboxChangeSignUpFirstName}/>
                        <input type="text" placeholder="lastname" className="signupInput"
                               value={signUpLastName}
                               onChange={this.onTextboxChangeSignUpLastName}/>

                        <Form.Control
                            as="select"
                            size="sm"
                            custom
                            onChange={this.onSelectItemChangeAgegroup}
                            ref={signUpAgegroup}
                        >
                            <option value= "" >Select Age Group</option>
                            <option value="0">18-24</option>
                            <option value="1">25-44</option>
                            <option value="2">45-59</option>
                            <option value="3">60+</option>
                        </Form.Control>
                        <input type="email" placeholder="email" className="signupInput"
                               value={signUpEmail}
                               onChange={this.onTextboxChangeSignUpEmail}/>
                        <input type="password" placeholder="password" className="signupInput"
                               value={signUpPassword}
                               onChange={this.onTextboxChangeSignUpPassword}/>

                        <button className="signupbutton mt-20" type="submit" onClick={this.onSignup}>Sign up</button>
                    </div>
                    </div>
            )
        }
        else if (signUpError == 'Signed up') {
            return (
                <div>
                    <h3>Register Successfully, Welcome {signUpFirstName}, <Link to={`/`}>=>Please Sign In</Link></h3>
                </div>
            )
        } else{
            return (
                <div>
                    <h3>{signUpError} hoops! register faild, please contact your admin</h3>
                </div>
            )
        }
    }

};

export default Signup;