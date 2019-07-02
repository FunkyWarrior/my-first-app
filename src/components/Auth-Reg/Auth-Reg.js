import React from 'react';
import {connect} from "react-redux";

import Input from '../Input'
import {
    changeLogInputValue,
    getUsers,
    checkUserAuthInfo,
    changeRegInputValue,
    checkUserRegInfo,
    addNewUser,
} from "../../store/auth/actions";


class AuthReg extends React.Component {

    componentDidMount() {
        this.props.getUsers('users','dataUsers')
    }

    checkUser = (event) => {
        this.props.checkUserAuthInfo();
        event.preventDefault()
    };

    regUser = (event) => {
        console.log(this.props.alert)
        this.props.checkUserRegInfo(this.props.addNewUser);
        event.preventDefault()
    };

    render() {
        const {authForm,regForm,showAuthForm,changeLogInputValue,changeRegInputValue} = this.props;
        return (
                <div className={showAuthForm ? 'logIn' : 'reg'}>
                    <h2 className={showAuthForm ? 'logIn__title' : 'reg__title'}>{showAuthForm ? 'Log In Form' : 'Reg Form'}</h2>
                    <form onSubmit={showAuthForm ? this.checkUser : this.regUser}  className={showAuthForm ? 'logIn__form' : 'reg__form'}>
                        {(showAuthForm ? authForm : regForm).map(el =>
                            <Input
                                key={el.id}
                                el={el}
                                changeInputValue={showAuthForm ? changeLogInputValue : changeRegInputValue}
                            />
                        )}
                        <input
                           className={showAuthForm ? 'logIn__submit' : 'reg__submit'}
                           type="submit"
                           value='Submit'
                        />
                    </form>
                </div>
        )
    }
}

const mapStateProps = state => {
    return {
        alert:state.auth.alert,
        regForm:state.auth.regForm,
        authForm:state.auth.authForm,
        showAuthForm:state.auth.showAuthForm
    }
};

const mapDispatchProps = {
    changeLogInputValue,
    changeRegInputValue,
    checkUserAuthInfo,
    getUsers,
    checkUserRegInfo,
    addNewUser
};

export default connect(mapStateProps,mapDispatchProps)(AuthReg);
