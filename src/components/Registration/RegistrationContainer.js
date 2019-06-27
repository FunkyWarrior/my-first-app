import React from 'react';
import {connect} from "react-redux";

import Input from '../Input'
import {
    changeRegInputValue,
    getUsers,
    checkUserRegInfo,
    addNewUser
} from "../../store/auth/actions";

class RegistrationContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers('users','dataUsers')
    }

    regUser = (event) => {
        this.props.checkUserRegInfo(this.props.addNewUser);
        event.preventDefault()
    };

    render() {
        return (
            <div className='reg'>
                <h2 className='reg__title'>Reg Form</h2>
                <form onSubmit={this.regUser}  className='reg__form'>
                    {this.props.form.map(el =>
                        <Input
                            key={el.id}
                            el={el}
                            changeInputValue={this.props.changeRegInputValue}
                        />
                    )}
                    <input
                        className='reg__submit'
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
        form:state.auth.regForm
    }
};

const mapDispatchProps = {
    changeRegInputValue,
    checkUserRegInfo,
    getUsers,
    addNewUser
};

export default connect(mapStateProps,mapDispatchProps)(RegistrationContainer);