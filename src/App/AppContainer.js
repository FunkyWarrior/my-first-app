// import React from 'react';
// import {connect} from "react-redux";
//
// import App from '../App'
// import {setCurrentUser, setDataOrders, setDataServices, setDataUsers} from "../store/app/actions";
//
//
//
//
//
// class AppContainer extends React.Component {
//     render() {
//         console.log(this.store)
//         return (
//
//             <App
//                 dataUsers={this.props.dataUsers}
//                 dataServices={this.props.dataServices}
//                 dataOrders={this.props.dataOrders}
//                 currentUser={this.props.currentUser}
//                 setDataUsers={this.props.setDataUsers}
//                 setDataServices={this.props.setDataServices}
//                 setDataOrders={this.props.setDataOrders}
//                 setCurrentUser={this.props.setCurrentUser}
//             />
//
//         )
//     }
// }
//
// const mapStateProps = state => {
//     return {
//         dataUsers: state.app.dataUsers,
//         dataServices: state.app.dataServices,
//         dataOrders: state.app.dataOrders,
//         currentUser: state.app.currentUser,
//     }
// };
//
// const mapDispatchProps = {
//     setDataUsers,
//     setDataServices,
//     setDataOrders,
//     setCurrentUser
// };
//
// export default connect(mapStateProps,mapDispatchProps)(AppContainer);