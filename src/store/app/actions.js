export const GET_REQUEST = "GET_REQUEST";
export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";

export const PUT_REQUEST = "POST_REQUEST";
export const PUT_REQUEST_SUCCESS = "POST_REQUEST_SUCCESS";
export const PUT_REQUEST_FAIL = "POST_REQUEST_FAIL";

export const APP_CREATE_CART = "APP_CREATE_CART";
export const APP_CHANGE_CART_PRODUCT = "APP_CHANGE_CART_PRODUCT";


//
// export const REMOVE_REQUEST = "REMOVE_REQUEST";
// export const REMOVE_REQUEST_SUCCESS = "REMOVE_REQUEST_SUCCESS";
// export const REMOVE_REQUEST_FAIL = "REMOVE_REQUEST_FAIL";

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

export const getData = (payload,where) => dispatch => {
    dispatch(getRequest());
    return fetch(`${URL}/${payload}.json`)
        .then(res => res.json())
        .then(res => dispatch(getRequestSuccess({res:res,where:where})))
        .catch(err => dispatch(getRequestFail(err)));
};
// -----------------------------------------------------------------------------------------------------------------

const putRequest = payload => ({
    type: PUT_REQUEST,
    payload
});

const putRequestSuccess = payload => ({
    type: PUT_REQUEST_SUCCESS,
    payload
});

const putRequestFail = payload => ({
    type: PUT_REQUEST_FAIL,
    payload
});

export const putDataApp = ({payload,where}) => dispatch => {
    dispatch(putRequest());
    return fetch(`${URL}/${where}.json`, {
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

export const createNewCart = payload => ({
    type: APP_CREATE_CART,
    payload
});

export const changeCartProduct = payload => ({
    type: APP_CHANGE_CART_PRODUCT,
    payload
});

// -----------------------------------------------------------------------------------------------------------------
