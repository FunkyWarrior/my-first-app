import {
    CHANGE_INPUT_VALUE_REG
} from "./actions";

const formFieldsReg = [
    {
        id:1,
        type:'text',
        value:"",
        name:'reg_name',
        placeholder:'Name',
        patter:"[a-zA-Zа-яёА-ЯЁ]{1,40}",
        minLength:1,
        maxLength:20,
        required:true
    },
    {
        id:2,
        type:'text',
        value:"",
        name:'reg_second_name',
        placeholder:'Last Name',
        patter:"[a-zA-Zа-яёА-ЯЁ]{1,40}",
        minLength:1,
        maxLength:20,
        required:true
    },
    {
        id:3,
        type:'email',
        value:"",
        name:'reg_email',
        placeholder:'E-Mail',
        required:true
    },
    {
        id:4,
        type:'tel',
        value:"",
        name:'reg_phone',
        title:'380xxxxxxxxx',
        placeholder:'380xxxxxxxxx',
        pattern:"380[0-9]{9}"
    },
    {
        id:5,
        type:'text',
        value:"",
        name:'avatar_url',
        placeholder:'Avatar URL'
    },
    {
        id:6,
        type:'password',
        value:"",
        name:'reg_password',
        placeholder:'Password',
        minLength:6,
        maxLength:25,
        required:true
    },
    {
        id:7,
        type:'password',
        value:"",
        name:'reg_password_repeat',
        placeholder:'Repeat Password',
        minLength:6,
        maxLength:25,
        required:true
    }
];

const defaultState = {
    regForm: formFieldsReg
};

export const registrationReducer = (state = defaultState,action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case CHANGE_INPUT_VALUE_REG :
            return {
                ...state,
                regForm: state.regForm.map(el => el.id === +action.payload.target.id ? {
                    ...el,
                    value:action.payload.target.value
                } : el)
            };
        default:
            return state
    }
};