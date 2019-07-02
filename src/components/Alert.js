import React from 'react'
import {
    setDataAuth
} from "../store/auth/actions";
import {
    setDataApp
} from "../store/app/actions";

import {connect} from "react-redux";


class Alert extends React.Component {

componentDidMount() {
    setTimeout(() => {
        this.props.setDataAuth({data:null,path:'alert'});
        this.props.setDataApp({data:null,path:'alert'});

    },10000)
}
close = () => {
    this.props.setDataAuth({data:null,path:'alert'});
    this.props.setDataApp({data:null,path:'alert'});
};

    render() {
        return (
            <>
                <div className='shadow-box' style={{zIndex:10}} onClick={this.close}/>
                <div className='alert'>
                    <p className='alert__text'>{this.props.alertAuth || this.props.alertApp}</p>
                </div>
            </>
        )
    }
}

const mapStateProps = state => {
    return {
        alertAuth:state.auth.alert,
        alertApp:state.app.alert
    }
};

const mapDispatchProps = {
    setDataAuth,
    setDataApp
};

export default connect(mapStateProps,mapDispatchProps)(Alert);
