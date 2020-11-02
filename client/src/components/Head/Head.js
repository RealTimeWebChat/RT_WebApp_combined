import React from "react";
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
//
const Head = () => (
    <nav>
        <div className="nav-wrapper blue-grey">
            <a href="#" className="brand-logo">Real-Time HRI Chat</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                    <Link to = {'/Setup'}>Setup</Link>
                </li>
                <li >
                    <Link to = {'/'}>Login</Link>
                </li>
                {/*<li><a href="Login.html">Login</a></li>*/}
                {/*<li><a href="collapsible.html">...</a></li>*/}
            </ul>
        </div>
    </nav>
)


export default Head;