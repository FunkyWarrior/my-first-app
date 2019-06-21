import React from 'react';
import {connect} from "react-redux";

import Input from '../Input'
import {changeRegInputValue} from "../../store/registration/actions";

class RegistrationContainer extends React.Component {
    render() {

        return (
            <div className='reg'>
                <h2 className='reg__title'>Reg Form</h2>
                <form onSubmit={this.props.regNewUser}  className='reg__form'>
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
        form:state.registration.regForm
    }
};

const mapDispatchProps = {
    changeRegInputValue
};

export default connect(mapStateProps,mapDispatchProps)(RegistrationContainer);