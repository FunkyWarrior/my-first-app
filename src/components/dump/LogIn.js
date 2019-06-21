import React from 'react';

export default (props) => {

    return (
        <div className='logIn'>
            <h2 className='logIn__title'>Log In Form</h2>
            <form  onSubmit={props.logIn} className='logIn__form'>
                <p>Enter your email</p>
                <input name='log_email' type="email" required onChange={props.handler}/>
                <p>Enter your password</p>
                <input name='log_password' type="password" minLength={6} maxLength={25} required onChange={props.handler}/>
                <input className='logIn__submit' type="submit" value='Submit'/>
            </form>

        </div>
    );
};

