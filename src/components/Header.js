import React from 'react';
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    render(){
        return (
            <header className='header'>
                <div className='header__inner'>
                        <Link className='header__link' to="/"> Company Name</Link>
                    <div className='header__inner-right'>
                            <Link className='header__link' to="/"> Home</Link>
                            <Link className='header__link' to="/about"> About</Link>
                            <Link className='header__link' to="/contacts"> Contacts</Link>
                        {!this.props.show && <div>
                            <a href='#' className='header__link' onClick={this.props.handler1}>Sign In</a>
                            <a href='#' className='header__link' onClick={this.props.handler2}>Sign Up</a>
                        </div>}
                        {this.props.show && <div>{this.props.user.name}</div>}
                    </div>
                </div>
            </header>
        )
    }

}
// onClick={this.props.logIn()}