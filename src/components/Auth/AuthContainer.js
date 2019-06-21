import React from 'react';
import {connect} from "react-redux";

import Input from '../Input'
import {changeLogInputValue} from "../../store/auth/actions";

class AuthContainer extends React.Component {
    render() {

        return (
            <div className='logIn'>
                <h2 className='logIn__title'>Log In Form</h2>
                <form onSubmit={this.props.checkUser}  className='logIn__form'>
                    {this.props.form.map(el =>
                        <Input
                            key={el.id}
                            el={el}
                            changeInputValue={this.props.changeLogInputValue}
                        />
                    )}
                    <input
                       className='logIn__submit'
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
        form:state.auth.authForm
    }
};

const mapDispatchProps = {
    changeLogInputValue
};

export default connect(mapStateProps,mapDispatchProps)(AuthContainer);