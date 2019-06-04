import React from 'react';

export default (props) => {

    return (
        <div className='reg'>
            <h2 className='reg__title'>Reg Form</h2>
            <form  onSubmit={props.logIn} className='reg__form'>
                <p>Enter your name(letters only):</p>
                <input name='reg_name' type="text" minLength="1" maxLength="40" pattern="[a-zA-Zа-яёА-ЯЁ]{1,40}"  placeholder="Name" required onChange={props.handler}/>
                <p>Enter your last Name(letters only):</p>
                <input name='reg_Lname' type="text" minLength="1" maxLength="40" pattern="[a-zA-Zа-яёА-ЯЁ]{1,40}"  placeholder="Last Name" onChange={props.handler}/>
                <p>Enter your email:</p>
                <input name='reg_email' type="email" placeholder="your-mail@mail.com" required onChange={props.handler}/>
                <p>Enter your phone:</p>
                <input name='reg_phone' type="tel" pattern="380[0-9]{9}" title='380xxxxxxxxx' placeholder="380xxxxxxxxx" onChange={props.handler}/>
                <p>Enter your avatar url link:</p>
                <input name='reg_avatar' type="text" required onChange={props.handler}/>
                <p>Enter your password:</p>
                <input name='reg_password1' type="password" minLength={6} maxLength={25} required onChange={props.handler}/>
                <p>Confirm your password:</p>
                <input name='reg_password2' type="password" minLength={6} maxLength={25} required onChange={props.handler}/>
                <input className='reg__submit' type="submit" value='Submit'/>
            </form>

        </div>
    );
};