import React from 'react';
import {Link} from "react-router-dom";
import {
    setDataAuth,
    clearDataAuth
} from "../../store/auth/actions";
import {clearDataApp} from "../../store/app/actions";
import {connect} from "react-redux";

import HeaderUserForm from './HeaderUserForm'

export class Header extends React.Component {

    showAuth =() => {
        this.props.setDataAuth({data:!this.props.auth.showAuthForm , path:'showAuthForm'});
        this.props.setDataAuth({data:!this.props.auth.showShadow , path:'showShadow'})
    };
    showReg =() => {
        this.props.setDataAuth({data:!this.props.auth.showRegForm , path:'showRegForm'});
        this.props.setDataAuth({data:!this.props.auth.showShadow , path:'showShadow'})
    };

    open = () => {
        document.getElementsByClassName('header__drop-products')[0].style.height = Object.keys(this.props.dataServices).length * 40+'px'
    };

    close = () => {
        document.getElementsByClassName('header__drop-products')[0].style.height = 0
    };

    render() {
        const {currentUser,dataServices,auth,setDataAuth,clearDataApp,clearDataAuth} = this.props;
        return (
            <header className='header'>
                <div className='header__inner'>
                    <Link className='header__link' to="/"> Company Name</Link>
                    <div className='header__inner-right'>
                        <div id='products' className='header__link' onMouseEnter={this.open} onMouseLeave={this.close}>Products
                            <ul className='header__drop-products'  >
                                {Object.keys(dataServices).map(el => (
                                    <li key ={el}>
                                        <Link className='header__link-drop' to={`/products/${el}`}>{el}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link className='header__link' to="/contacts">Contacts</Link>
                        <Link className='header__link' to="/reviews">Reviews</Link>
                        {!auth.showUserForm &&
                        <div className='header__inner-right'>
                            <button  className='header__link' onClick={this.showAuth}>Sign In</button>
                            <button  className='header__link' onClick={this.showReg}>Sign Up</button>
                        </div>
                        }
                        {auth.showUserForm && <HeaderUserForm  currentUser={currentUser} clearApp={clearDataApp} clearAuth={clearDataAuth} setDataAuth={setDataAuth}/> }
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth:state.auth,
        currentUser:state.auth.currentUser,
        dataServices:state.app.dataServices
    }
};

const mapDispatchToProps = {
    setDataAuth,
    clearDataApp,
    clearDataAuth
};

export default connect (mapStateToProps,mapDispatchToProps)(Header)

