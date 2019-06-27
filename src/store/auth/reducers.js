import {
    CHANGE_INPUT_VALUE_LOG,
    CHANGE_INPUT_VALUE_REG,

    USER_AUTHORIZATION,
    USER_REGISTRATION,

    GET_REQUEST,
    GET_REQUEST_SUCCESS,
    GET_REQUEST_FAIL,

    PUT_REQUEST,
    PUT_REQUEST_SUCCESS,
    PUT_REQUEST_FAIL,

    // CHANGE_SHOW_USER_FORM_FLAG,
    CHANGE_SHOW_SHADOW_FLAG,
    CHANGE_SHOW_AUTH_FORM_FLAG,
    CHANGE_SHOW_REG_FORM_FLAG,


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

const formFieldsReg = [
    {
        id:1,
        type:'text',
        value:"",
        name:'reg_name',
        placeholder:'Name *',
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
    },
    {
        id:3,
        type:'email',
        value:"",
        name:'reg_email',
        placeholder:'E-Mail *',
        required:true
    },
    {
        id:4,
        type:'tel',
        value:"",
        name:'reg_phone',
        title:'380xxxxxxxxx',
        placeholder:'Phone: 380xxxxxxxxx',
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
        placeholder:'Password *',
        minLength:6,
        maxLength:25,
        required:true
    },
    {
        id:7,
        type:'password',
        value:"",
        name:'reg_password_repeat',
        placeholder:'Repeat Password *',
        minLength:6,
        maxLength:25,
        required:true
    }
];

const defaultState = {
    dataUsers:[],
    authForm : formFieldsLog,
    regForm: formFieldsReg,
    currentUser:{
        id:0,
        email:'',
        root:false
    },
    showUserForm:false,
    showShadow:false,
    showAuthForm:false,
    showRegForm:false,
    isFetching:false,
    error:null
};

// -----------------------------------------------------------------------------------------------------------------

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

        case CHANGE_INPUT_VALUE_REG :
            return {
                ...state,
                regForm: state.regForm.map(el => el.id === +action.payload.target.id ? {
                    ...el,
                    value:action.payload.target.value
                } : el)
            };
// -----------------------------------------------------------------------------------------------------------------

        case GET_REQUEST : {
            return { ...state, isFetching: true };
        }

        case GET_REQUEST_SUCCESS : {
            return {
                ...state,
                [action.payload.where]:action.payload.res,
                isFetching: false
            }
        }

        case GET_REQUEST_FAIL : {
            return {
                ...state,
                error:action.payload,
                isFetching: false
            }
        }
// -----------------------------------------------------------------------------------------------------------------

        case PUT_REQUEST: {
            return { ...state, isFetching: true };
        }

        case PUT_REQUEST_SUCCESS: {
            return {
                ...state,
                dataUsers: state.dataUsers.concat(state.currentUser),
                showUserForm:!state.showUserForm,
                showShadow:!state.showShadow,
                showRegForm:!state.showRegForm,
                isFetching: false,
            }
        }

        case PUT_REQUEST_FAIL: {
            return {
                ...state,
                error: action.payload,
                isFetching: false,
                currentUser:{
                    id:0,
                    root:false
                }
            }
        }
// -----------------------------------------------------------------------------------------------------------------

        case USER_AUTHORIZATION : {
            const user = state.dataUsers.find(user => user.email === state.authForm[0].value);
            if(user){
                if(user.password === state.authForm[1].value){
                    return {
                        ...state,
                        currentUser:user,
                        showUserForm:!state.showUserForm,
                        showShadow:!state.showShadow,
                        showAuthForm:!state.showAuthForm
                    }
                }else alert('Password doesnt match')
            }else alert('Email doesnt match');
            return state
        }

// -----------------------------------------------------------------------------------------------------------------

        case USER_REGISTRATION : {
            let some = true;
            // eslint-disable-next-line array-callback-return
            state.dataUsers.map(user => {
                if(user.email === state.regForm[2].value){
                    alert('Email already taken');
                    some = false;
                    return state
                }
            });
            if(some){
               if(!(state.regForm[5].value === state.regForm[6].value)){
                   alert('Passwords doesnt match');
                   some = false;
                   return state
               }
            }
            if (some) {
                let user = {
                    name:`${state.regForm[0].value}`,
                    lastName:`${state.regForm[1].value}`,
                    email:`${state.regForm[2].value}`,
                    id:state.dataUsers[state.dataUsers.length-1].id + 1,
                    phone:`${state.regForm[3].value}`,
                    avatarUrl:`${state.regForm[4].value === '' ? "/img/kotikUser.jpg" : state.regForm[4].value}`,
                    regDate:new Date().toLocaleString(),
                    password:`${state.regForm[5].value}`,
                    root:false,
                };
                action.payload([...state.dataUsers,user]);
                return {
                    ...state,
                    currentUser:user
                }
            }
            return state
        }
// -----------------------------------------------------------------------------------------------------------------

        // case CHANGE_SHOW_USER_FORM_FLAG : {
        //     return {
        //         ...state,
        //         showUserForm:!state.showUserForm
        //     }
        // }
        case CHANGE_SHOW_REG_FORM_FLAG : {
            return {
                ...state,
                showRegForm:!state.showRegForm
            }
        }

        case CHANGE_SHOW_SHADOW_FLAG : {
            return {
                ...state,
                showShadow:!state.showShadow
            }
        }

        case CHANGE_SHOW_AUTH_FORM_FLAG : {
            return {
                ...state,
                showAuthForm:!state.showAuthForm
            }
        }

        default:
            return state
    }
};

