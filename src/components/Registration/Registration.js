import React from 'react';


export default class Registration extends React.Component {
    render(){
        return (
            <input
                name='reg_name'
                type="text"
                value={this.props.name}
                minLength="1"
                maxLength="40"
                pattern="[a-zA-Zа-яёА-ЯЁ]{1,40}"
                placeholder="Name"
                required
                onChange={this.onNameChange}
            />
        );
    }
};

