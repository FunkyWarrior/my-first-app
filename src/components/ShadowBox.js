import React from 'react'
import {
    setDataAuth,
} from "../store/auth/actions";

import {connect} from "react-redux";
import {setDataApp} from "../store/app/actions";


class shadowBox extends React.Component {

    clearShadow = () => {
        this.props.setDataAuth({data:!this.props.showShadow,path:'showShadow'});
        this.props.setDataApp({data:null,path:'currentModal'});
        this.props.setDataAuth({data:false,path:'showChangeUser'});
        if(this.props.auth) this.props.setDataAuth({data:!this.props.auth,path:'showAuthForm'});
        if(this.props.reg) this.props.setDataAuth({data:!this.props.reg,path:'showRegForm'});
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
        showShadow:state.auth.showShadow,
        auth:state.auth.showAuthForm,
        reg:state.auth.showRegForm,

    }
};

const mapDispatchProps = {
    setDataApp,
    setDataAuth
};

export default connect(mapStateProps,mapDispatchProps)(shadowBox);
