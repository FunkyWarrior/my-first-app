import React from 'react';
import {connect} from "react-redux";

import UserPage from './UserPage'

class UserPageContainer extends React.Component {
    render() {
        const {dataUsers} = this.props
        const userId = this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length -1];
        return (
            <div className='main'>
                <UserPage
                    userId={userId}
                    dataUsers={dataUsers}
                />
            </div>
        )
    }
}

const mapStateProps = state => {
    return {
        dataUsers:state.auth.dataUsers,
    }
};

const mapDispatchProps = {

};

export default connect(mapStateProps,mapDispatchProps)(UserPageContainer);