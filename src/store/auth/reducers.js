import {
    CHANGE_INPUT_VALUE_LOG
} from './actions'

const formFieldsLog = [
        {
            id:1,
            type:'email',
            value:"",
            name:'log_email',
            placeholder:'E-mail',
            required:true
        },
        {
            id:2,
            type:'password',
            value:"",
            name:'log_password',
            placeholder:'Password',
            minLength:6,
            maxLength:25,
            required:true
        }
    ];

const defaultState = {
    authForm : formFieldsLog
};

export const authReducer = (state = defaultState,action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case CHANGE_INPUT_VALUE_LOG :
            return {
                ...state,
                authForm: state.authForm.map(el => el.id === +action.payload.target.id ? {
                    ...el,
                    value:action.payload.target.value
                } : el)
            };
        default:
            return state
    }
};