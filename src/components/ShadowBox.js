import React from 'react'
import {
    setShadowFlag,
    setAuthFormFlag,
    setRegFormFlag
} from "../store/auth/actions";

import {connect} from "react-redux";


class shadowBox extends React.Component {

    clearShadow = () => {
        this.props.setShadowFlag();
        if(this.props.auth) this.props.setAuthFormFlag();
        if(this.props.reg) this.props.setRegFormFlag();
    };

    render() {
        return (
            <div onClick={this.clearShadow} className='shadow-box'>
            </div>
        )
    }
}

const mapStateProps = state => {
    return {
        auth:state.auth.showAuthForm,
        reg:state.auth.showRegForm
    }
};

const mapDispatchProps = {
    setShadowFlag,
    setAuthFormFlag,
    setRegFormFlag
};

export default connect(mapStateProps,mapDispatchProps)(shadowBox);
