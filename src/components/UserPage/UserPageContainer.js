import React from 'react';
import {connect} from "react-redux";

import UserPage from './UserPage'

class UserPageContainer extends React.Component {
    render() {
        let userId = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length -1];
        return (
            <div className='main'>
                <UserPage
                    userId={userId}
                    dataUsers={this.props.dataUsers}
                    dataOrders={this.props.dataOrders}
                    dataServices={this.props.dataServices}
                />
            </div>
        )
    }
}

const mapStateProps = state => {
    return {
        dataUsers:state.app.dataUsers,
        dataOrders:state.app.dataOrders,
        dataServices:state.app.dataServices

    }
};

const mapDispatchProps = {

};

export default connect(mapStateProps,mapDispatchProps)(UserPageContainer);