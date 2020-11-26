import React, { Component } from "react";
import 'whatwg-fetch'
import '../Join/Join.css'

//customer function
import {getFromStorage, setInStorage} from "../../utils/storage";
import {Link} from "react-router-dom";

//server endpoint
const ENDPOINT = 'http://localhost:5000';
// const ENDPOINT = 'https://rt-chatwebapp.herokuapp.com/';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state={
            isLoading: true,
            token: '',
            userfirstName:''
        };

        this.logout = this.logout.bind(this);
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

       this.logout()
    }

    logout(){
        this.setState({
            isLoading: true
        })

        const obj = getFromStorage('user_token');
        const obj_userid = getFromStorage('user_id');

        if(obj && obj.token){
            const { token } = obj;
            const { user_id } = obj_userid;

            fetch(ENDPOINT + '/api/account/logout?token='+token+ '&userid=' + user_id)
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    if(json.success){
                        this.setState({
                            token: '',
                            isLoading: false,
                            userfirstName: json.userfirstName
                        });
                    } else{
                        this.setState({
                            isLoading:false
                        })
                    }
                });
        }else{
            this.setState({
                isLoading: false,
            });
        }
    }

    render() {
        const {
            isLoading,
            userfirstName
        } = this.state

        if (isLoading){
            return(<div><p>Loading...</p></div>)
        }

        return(
            <div>
                <h3> Thank {userfirstName} for participating this experiment</h3>
            </div>
        )
    }

}

export default Logout;