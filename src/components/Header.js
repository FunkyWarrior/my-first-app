import React from 'react';
import {Link} from "react-router-dom";
import {
    setShadowFlag,
    setAuthFormFlag,
    setRegFormFlag
} from "../store/auth/actions";
import {connect} from "react-redux";


export class Header extends React.Component {
    showAuth =() => {
        this.props.setAuthFormFlag();
        this.props.setShadowFlag()
    };
    showReg =() => {
        this.props.setRegFormFlag();
        this.props.setShadowFlag()
    };
    render() {
        return (
            <header className='header'>
                <div className='header__inner'>
                    <Link className='header__link' to="/"> Company Name</Link>
                    <div className='header__inner-right'>
                        <div id='products' className='header__link'>Products
                            <ul className='header__drop-products'>
                                <li>
                                    <Link className='header__link-drop' to="/products/kotiki"  >Kotiki</Link>
                                </li>
                                <li>
                                    <Link className='header__link-drop' to="/products/pesiki"  >Pesiki</Link>
                                </li>
                            </ul>
                        </div>
                        <Link className='header__link' to="/contacts">Contacts</Link>
                        <Link className='header__link' to="/reviews">Reviews</Link>
                        {!this.props.auth.showUserForm &&
                        <div className='header__inner-right'>
                            <button  className='header__link' onClick={this.showAuth}>Sign In</button>
                            <button  className='header__link' onClick={this.showReg}>Sign Up</button>
                        </div>
                        }
                        {this.props.auth.showUserForm &&
                        <div className='header__user-form'>
                            <img className='header__user-img' src={this.props.currentUser.avatarUrl} alt=""/>

                            <h2>{this.props.currentUser.name}</h2>
                            <ul className='header__drop'>
                                <li>
                                    <Link className='header__link-drop' to="/">Change Info</Link>
                                </li>
                                <li>
                                    <Link className='header__link-drop' to={`/user/${this.props.currentUser.id}/orders`}>Your Orders</Link>
                                </li>
                                <li>
                                    <Link className='header__link-drop' to="/">Log Out</Link>
                                </li>
                            </ul>
                        </div>
                        }
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth:state.auth,
        currentUser:state.auth.currentUser
    }
};

const mapDispatchToProps = {
    setShadowFlag,
    setAuthFormFlag,
    setRegFormFlag
};

export default connect (mapStateToProps,mapDispatchToProps)(Header)