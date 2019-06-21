import React from 'react';
import {Link} from "react-router-dom";

export default (props) => {
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
                    {!props.show &&
                    <div className='header__inner-right'>
                        <button  className='header__link' onClick={props.handler1}>Sign In</button>
                        <button  className='header__link' onClick={props.handler2}>Sign Up</button>
                    </div>
                    }
                    {props.show &&
                    <div className='header__user-form'>
                        <img className='header__user-img' src={props.user.avatarUrl} alt=""/>

                        <h2>{props.user.name}</h2>
                        <ul className='header__drop'>
                            <li>
                                <Link className='header__link-drop' to="/">Change Info</Link>
                            </li>
                            <li>
                                <Link className='header__link-drop' to={`/user/${props.user.id}/orders`}>Your Orders</Link>
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
