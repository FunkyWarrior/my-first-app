import React from 'react';
import {Link} from "react-router-dom";

export default class HeaderUserForm extends React.Component {

    clearAll =(e) => {
        e.preventDefault();
        this.props.clearApp();
        this.props.clearAuth();
        localStorage.clear()
    };

    changeUserInfo =(e) => {
        e.preventDefault();
       this.props.setDataAuth({data:true,path:'showChangeUser'})
        this.props.setDataAuth({data:true,path:'showShadow'})
    };

    render () {
        const {currentUser}=this.props;
        localStorage.setItem('currentUser',JSON.stringify(currentUser));
        return (
                <div className='header__user-form'>
                    <img className='header__user-img' src={currentUser.avatarUrl} alt=""/>
                    <h2>{currentUser.name}</h2>
                    <ul className='header__drop'>
                        <li>
                            <Link className='header__link-drop' to="/" onClick={this.changeUserInfo}>Change Info</Link>
                        </li>
                        <li>
                            <Link className='header__link-drop' to={`/user/${currentUser.id}/orders`}>Your Orders</Link>
                        </li>
                        <li>
                            <Link className='header__link-drop' to="/" onClick={this.clearAll}>Log Out</Link>
                        </li>
                    </ul>
                </div>
        );
    }
};

