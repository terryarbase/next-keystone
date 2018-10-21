import React, {Component} from "react";
import {connect} from "react-redux";

class Page extends Component {
    render() {
    	// console.log('>>1>>>', this.props);
        return (
            <div>
                Welcome to the Next KeystoneJS
            </div>
        )
    }
}

export default connect(
  (state) => {
  	console.log(state.toJS());
  	return {};
  },
  (dispatch) => ({})
)(Page);
