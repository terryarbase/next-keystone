import React, { Component } from "react";
// components
import Link from "Components/common/Link";
// style sheets
import css from "Styles/common/common.scss";
// import {connect} from "react-redux";

class App extends Component {
    render() {
        return (
        	<div>
	            <div className={css.common}>
	                Welcome to the Next KeystoneJS
	            </div>
	            <div><Link href="/aboutus">About Us</Link></div>
            </div>
        )
    }
}

export default App;
