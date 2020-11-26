import React from "react";

import {BrowserRouter as Router, Route} from "react-router-dom";

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Head from './components/Head/Head';
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Logout from "./components/Logout/Logout";
import WebRTCSimperPeer from "./components/WebRTC/WebRTCSimperPeer"

const App = () =>(
    //register all components
  <Router>
     <Head />
      {/*<Route path="/" exact component = {WebRTCSimperPeer} />*/}
      <Route path="/" exact component = {Join} />
      <Route path="/Chat" exact component = {Chat} />
      <Route path="/Signin" component = {Signin} />
      <Route path="/Signup" component = {Signup} />
      <Route path="/Logout" component = {Logout} />
      <Route path="/WebRTC" component={WebRTCSimperPeer} />
  </Router>
);

export default App;