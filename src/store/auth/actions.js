export const CHANGE_INPUT_VALUE_LOG = "CHANGE_INPUT_VALUE_LOG";
export const CHANGE_INPUT_VALUE_REG = "CHANGE_INPUT_VALUE_REG";
export const CHANGE_INPUT_VALUE_USER = "CHANGE_INPUT_VALUE_USER";

export const USER_AUTHORIZATION = 'USER_AUTHORIZATION';
export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_INFO_CHANGE = 'USER_INFO_CHANGE';

export const AUTH_SET_DATA = 'AUTH_SET_DATA';
export const AUTH_CLEAR_DATA = 'AUTH_CLEAR_DATA';

export const CHANGE_SHOW_AUTH_FORM_FLAG = "CHANGE_SHOW_AUTH_FORM_FLAG";
export const CHANGE_SHOW_REG_FORM_FLAG = "CHANGE_SHOW_REG_FORM_FLAG";
export const CHANGE_SHOW_SHADOW_FLAG = "CHANGE_SHOW_SHADOW_FLAG";

export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";

export const PUT_REQUEST = "PUT_REQUEST";
export const PUT_REQUEST_SUCCESS = "PUT_REQUEST_SUCCESS";
export const PUT_REQUEST_FAIL = "PUT_REQUEST_FAIL";


const URL = "https://boris-first-app.firebaseio.com/";

// -----------------------------------------------------------------------------------------------------------------

const getRequest = payload => ({
    type: GET_REQUEST,
    payload
});

const getRequestSuccess = payload => ({
    type: GET_REQUEST_SUCCESS,
    payload
});

const getRequestFail = payload => ({
    type: GET_REQUEST_FAIL,
    payload
});

export const getUsers = (payload,where) => dispatch => {
    dispatch(getRequest());
    return fetch(`${URL}/${payload}.json`)
        .then(res => res.json())
        .then(res => dispatch(getRequestSuccess({res:res,where:where})))
        .catch(err => dispatch(getRequestFail(err)));
};

// -----------------------------------------------------------------------------------------------------------------

// const putRequest = payload => ({
//     type: PUT_REQUEST,
//     payload
// });

const putRequestSuccess = payload => ({
    type: PUT_REQUEST_SUCCESS,
    payload
});

const putRequestFail = payload => ({
    type: PUT_REQUEST_FAIL,
    payload
});

export const addNewUser = payload => dispatch => {
    console.log(payload)
    //dispatch(putRequest());
        return fetch(`${URL}/users.json`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(res => res.json())
            .then(res => dispatch(putRequestSuccess(res)))
            .catch(err => dispatch(putRequestFail(err)));

};

// -----------------------------------------------------------------------------------------------------------------

export const checkUserAuthInfo = payload => ({
    type: USER_AUTHORIZATION,
    payload
});

export const checkUserRegInfo = payload => ({
    type: USER_REGISTRATION,
    payload
});

export const changeUserInfo = payload => ({
    type: USER_INFO_CHANGE,
    payload
});

// -----------------------------------------------------------------------------------------------------------------

export const changeLogInputValue = payload => ({
    type: CHANGE_INPUT_VALUE_LOG,
    payload
});

export const changeRegInputValue = payload => ({
    type: CHANGE_INPUT_VALUE_REG,
    payload
});

export const changeUserInputValue = payload => ({
    type: CHANGE_INPUT_VALUE_USER,
    payload
});

// -----------------------------------------------------------------------------------------------------------------

export const setDataAuth = payload => ({
    type: AUTH_SET_DATA,
    payload
});

export const clearDataAuth = payload => ({
    type: AUTH_CLEAR_DATA,
    payload
});