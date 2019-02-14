// import React, { Component } from "react";
// import { connect } from "react-redux";
// // components
// import Link from "Components/common/Link";
// // style sheets
// import css from "Styles/common/common.scss";
// // import {connect} from "react-redux";
// // reducer actions
// import {
//   registerApplication,
// } from 'Client/reducers/common/actions';

// class App extends Component {
//     componentWillMount() {
//         this.props.registerApplication();
//     }

//     render() {
//         return (
//         	<div>
// 	            <div className={css.common}>
// 	                Welcome to the Next KeystoneJS
// 	            </div>
// 	            <div><Link href="/aboutus">About Us</Link></div>
//             </div>
//         )
//     }
// }

// /*
// ** dummy appInfo request
// */
// const mapStateToProps = state => {
//     const commonJS = state.get('common').toJS();
//     const { application: { appInfo } } = commonJS;
//     return {
//         appInfo,
//     };
// };

// const mapDispatchToProps = {
//     registerApplication,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(App)
