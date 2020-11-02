import React from "react";

import {BrowserRouter as Router, Route} from "react-router-dom";

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Head from './components/Head/Head';
import Avatar from './components/Saoirse/LoadAvatar_new';


const App = () =>(
  <Router>
     <Head />
      <Route path="/" exact component = {Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/Avatar" component={Avatar} />
  </Router>
);

export default App;