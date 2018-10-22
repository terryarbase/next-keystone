import React, { Component } from "react";
import { connect } from "react-redux";
// import {connect} from "react-redux";

class AboutUs extends Component {
	static async getInitialProps({ req }) {
		if (req && req.params && req.params.id) {
		    const { params: { id } } = req;
		    return { id };
		}
		return {};
	}

    render() {
    	// console.log('>>1>>>', this.props);
        return (
            <div>
                About Us {this.props.id}
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.get('common').toJS());
    return {};
};

export default connect(mapStateToProps, {})(AboutUs);
