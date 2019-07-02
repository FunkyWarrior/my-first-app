import {
    CHANGE_INPUT_VALUE_LOG,
    CHANGE_INPUT_VALUE_REG,
    CHANGE_INPUT_VALUE_USER,

    USER_AUTHORIZATION,
    USER_REGISTRATION,
    USER_INFO_CHANGE,

    GET_REQUEST,
    GET_REQUEST_SUCCESS,
    GET_REQUEST_FAIL,

    PUT_REQUEST,
    PUT_REQUEST_SUCCESS,
    PUT_REQUEST_FAIL,

    AUTH_SET_DATA,
    AUTH_CLEAR_DATA


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

const formFieldsChangeUser = [
    {
        id:1,
        type:'text',
        value:"",
        name:'name',
        placeholder:'Name *',
        patter:"[a-zA-Zа-яёА-ЯЁ]{1,40}",
        minLength:1,
        maxLength:20
    },
    {
        id:2,
        type:'text',
        value:"",
        name:'lastName',
        placeholder:'Last Name',
        patter:"[a-zA-Zа-яёА-ЯЁ]{1,40}",
        minLength:1,
        maxLength:20,
    },
    {
        id:3,
        type:'email',
        value:"",
        name:'email',
        placeholder:'E-Mail *'
    },
    {
        id:4,
        type:'tel',
        value:"",
        name:'phone',
        title:'380xxxxxxxxx',
        placeholder:'Phone: 380xxxxxxxxx',
        pattern:"380[0-9]{9}"
    },
    {
        id:5,
        type:'text',
        value:"",
        name:'avatarUrl',
        placeholder:'Avatar URL'
    },
    {
        id:6,
        type:'password',
        value:"",
        name:'password',
        placeholder:'Password *',
        minLength:6,
        maxLength:25,
        required:true
    },
    {
        id:7,
        type:'password',
        value:"",
        name:'password',
        placeholder:'Repeat Password *',
        minLength:6,
        maxLength:25,
        required:true
    }
];

const defaultState = {
    dataUsers:[{
        name: '',
        lastName: '',
        email: '',
        phone: 0,
        avatarUrl:'',
        password: 0,
        root: false,
        id: 0
    }],
    authForm : formFieldsLog,
    regForm: formFieldsReg,
    changeForm: formFieldsChangeUser,
    currentUser:localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) :
        {
        id:0,
        email:'',
        root:false
    },
    alert:null,
    showUserForm:localStorage.getItem('currentUser'),
    showChangeUser:false,
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

// -----------------------------------------------------------------------------------------------------------------
        case AUTH_SET_DATA : {

            return {
                ...state,
                [action.payload.path]:action.payload.data
            }
        }

        case AUTH_CLEAR_DATA : {
            return {
                ...state,
                authForm : formFieldsLog,
                regForm: formFieldsReg,
                changeForm: state.changeForm.map(el => el ? {
                    ...el,
                        value:''
                } : el),
                currentUser:{
                    id:0,
                    email:'',
                    root:false
                },
                alert:null,
                showUserForm:false,
                showShadow:false,
                showAuthForm:false,
                showRegForm:false,
                isFetching:false,
                error:null
            }
        }
// -----------------------------------------------------------------------------------------------------------------

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

        case CHANGE_INPUT_VALUE_USER :
            return {
                ...state,
                changeForm: state.changeForm.map(el => el.id === +action.payload.target.id ? {
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
                dataUsers: action.payload,
                showChangeUser:false,

                showShadow:false,
                showRegForm:false,
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
                        showAuthForm:!state.showAuthForm,
                        authForm : formFieldsLog,

                    }
                }else return {
                    ...state,
                    alert:'Password doesnt match'
                }
            }else return {
                ...state,
                alert:'Email doesnt found'
            }
        }

// -----------------------------------------------------------------------------------------------------------------

        case USER_REGISTRATION : {
            let some = true;
            if (state.dataUsers.find(user => user.email === state.regForm[2].value)){
                console.log(state.dataUsers,state.regForm[2].value);
                some = false;
                return {
                    ...state,
                    alert:'Email already taken'
                }
            }

            if(some){
               if(!(state.regForm[5].value === state.regForm[6].value)){
                   some = false;
                   return {
                       ...state,
                       alert:'Passwords doesnt match'
                   }
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
                    currentUser:user,
                    regForm: formFieldsReg,
                }
            }
            return state
        }

// -----------------------------------------------------------------------------------------------------------------

        case USER_INFO_CHANGE : {
            const changedDataUsers = state.dataUsers.slice()

            let some = true;
            if (state.dataUsers.find(user => user.email === state.regForm[2].value)){
                some = false;
                return {
                    ...state,
                    alert:'Email already taken'
                }
            }
            if(some){
                if(!(state.changeForm[5].value === state.changeForm[6].value)){
                    some = false;
                    return {
                        ...state,
                        alert:'Passwords doesnt match'
                    }
                }
            }
            if(some){
                action.payload(changedDataUsers.map(el => el.id === state.currentUser.id ? {
                    ...el,
                    name:`${state.changeForm[0].value}`,
                    lastName:`${state.changeForm[1].value}`,
                    email:`${state.changeForm[2].value}`,
                    phone:`${state.changeForm[3].value}`,
                    avatarUrl:`${state.changeForm[4].value}`,
                    password:`${state.changeForm[5].value}`,
                    root:false,
                } : el));
                return {
                    ...state,
                    currentUser:{...state.currentUser,
                        name:`${state.changeForm[0].value}`,
                        lastName:`${state.changeForm[1].value}`,
                        email:`${state.changeForm[2].value}`,
                        phone:`${state.changeForm[3].value}`,
                        avatarUrl:`${state.changeForm[4].value}`,
                        password:`${state.changeForm[5].value}`,
                        root:false,
                    },
                    changeForm: formFieldsChangeUser,
                }
            }
            return state
        }


        default:
            return state
    }
};

