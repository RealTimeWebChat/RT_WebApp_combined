import React, { Component } from "react";
import 'whatwg-fetch'
// import { Dropdown, Form } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

import './Signin.css'

//customer function
import {getFromStorage, setInStorage} from "../../utils/storage";
import {Link} from "react-router-dom";


//server endpoint
const ENDPOINT = 'http://localhost:5000';
// const ENDPOINT = 'https://rt-chatwebapp.herokuapp.com/';

class Signin extends Component {
   constructor(props) {
       super(props);
       this.state={
           isLoading: true,
           signInError: '',
           masterError: '',
           signInEmail: '',
           signInPassword: '',
           getFirstName:'',
           token: ''
       };

       this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
       this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
       this.onSignIn = this.onSignIn.bind(this);
   }

   componentDidMount() {

       //verify if has a user account login already and login automatically
       const obj = getFromStorage('user_token');

       if(obj && obj.token){
           const { token } = obj;

           //verify token by fetch user collection from db
           fetch(ENDPOINT+'/api/account/userverify?token='+token
               ).then(res => res.json())
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

    onTextboxChangeSignInEmail(event)
    {
        this.setState({
            signInEmail: event.target.value,
        })
    }

    onTextboxChangeSignInPassword(event)
    {
        this.setState({
            signInPassword: event.target.value,
        })
    }

    onSignIn()
    {
        //grab state
        const{
            signInEmail,
            signInPassword
        } = this.state;

        this.setState({
            isLoading:true,
        })
        //post request to backup
        fetch(ENDPOINT + '/api/account/signin', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        }).then(res => res.json())
            .then(json => {
                if(json.success){
                    setInStorage('user_token', { token: json.token});
                    setInStorage('user_id', {user_id: json.user_id})
                    this.setState(
                        {
                            signInError:json.message,
                            isLoading: false,
                            signInEmail:'',
                            signInPassword:'',
                            token: json.token,
                            getFirstName:json.firstName
                        });
                }else{
                    this.setState(
                        {
                            signInError:json.message,
                            isLoading: false
                        });
                }
            });
    }

   render() {
       const {
           isLoading,
           token,
           signInError,
           signInPassword,
           signInEmail,
           getFirstName
       } = this.state

       if (isLoading){
           return(<div><p>Loading...</p></div>)
       }

       if (!token){
           return(
               <div className="signinOuterContainer">
                   <div className= "signinInnerContainer">
                   {
                       (signInError)?(<p>{signInError}</p>) : null
                   }
                   <h1 className="heading">Sign In</h1>
                   <input type="email" placeholder="email" className="signinInput"
                          value={signInEmail}
                          onChange={this.onTextboxChangeSignInEmail}/>

                   <input type="password" placeholder="password" className="signinInput"
                          value={signInPassword}
                          onChange={this.onTextboxChangeSignInPassword}/>
                   <button className="signinbutton mt-20" type="submit" onClick={this.onSignIn}>Sign In</button>
                   </div>
               </div>
           )
       }
       return(
           <div>
               <h3>Welcome {getFirstName}, Let us have a Chat, <Link to={`/Join`}>=>Go to Chat Room</Link></h3>
           </div>
           )
   }

}

export default Signin;