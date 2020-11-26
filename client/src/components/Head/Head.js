import React from "react";
import { Link } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';

const Head = () => (
    <nav>
        <div className="nav-wrapper blue-grey">

            <a href="#" className="brand-logo">Real-Time HRI Chat</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">

                <li>
                    <Link to = '/Signup'>Sign Up</Link>
                </li>
                <li >
                    <Link to = '/'>Sign In</Link>
                </li>
                <li>
                    {/*logout and feedback */}
                    <Link to = '/logout'>Logout</Link>
                </li>

                {/*<li><a href="Login.html">Login</a></li>*/}
                {/*<li><a href="collapsible.html">...</a></li>*/}
            </ul>
        </div>
    </nav>
)


export default Head;