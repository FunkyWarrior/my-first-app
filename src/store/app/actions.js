export const APP_CHANGE_DATA_USERS = 'APP_CHANGE_DATA_USERS';
export const APP_CHANGE_DATA_SERVICES = 'APP_CHANGE_DATA_SERVICES';
export const APP_CHANGE_DATA_ORDERS = 'APP_CHANGE_DATA_ORDERS';
export const APP_CHANGE_CURRENT_USER = 'APP_CHANGE_CURRENT_USER';
export const APP_CHANGE_CART_ARRAY = 'APP_CHANGE_CART_ARRAY';
export const APP_CHANGE_CART_GROUP = 'APP_CHANGE_CART_GROUP';
export const APP_CHANGE_CART_SUM = 'APP_CHANGE_CART_SUM';

// export const GET_REQUEST = "GET_REQUEST";
// export const GET_REQUEST_SUCCESS = "GET_REQUEST_SUCCESS";
// export const GET_REQUEST_FAIL = "GET_REQUEST_FAIL";
//
// export const POST_REQUEST = "POST_REQUEST";
// export const POST_REQUEST_SUCCESS = "POST_REQUEST_SUCCESS";
// export const POST_REQUEST_FAIL = "POST_REQUEST_FAIL";
//
// export const REMOVE_REQUEST = "REMOVE_REQUEST";
// export const REMOVE_REQUEST_SUCCESS = "REMOVE_REQUEST_SUCCESS";
// export const REMOVE_REQUEST_FAIL = "REMOVE_REQUEST_FAIL";

export const setDataUsers = payload => ({
    type: APP_CHANGE_DATA_USERS,
    payload
});

export const setDataServices = payload => ({
    type: APP_CHANGE_DATA_SERVICES,
    payload
});

export const setDataOrders = payload => ({
    type: APP_CHANGE_DATA_ORDERS,
    payload
});

export const setCurrentUser = payload => ({
    type: APP_CHANGE_CURRENT_USER,
    payload
});

export const setCartArray = payload => ({
    type: APP_CHANGE_CART_ARRAY,
    payload
});

export const setCartGroup = payload => ({
    type: APP_CHANGE_CART_GROUP,
    payload
});

export const setCartSum = payload => ({
    type: APP_CHANGE_CART_SUM,
    payload
});