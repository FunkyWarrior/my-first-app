import {
    APP_CHANGE_DATA_USERS,
    APP_CHANGE_DATA_SERVICES,
    APP_CHANGE_DATA_ORDERS,
    APP_CHANGE_CURRENT_USER,
    APP_CHANGE_CART_ARRAY,
    APP_CHANGE_CART_GROUP,
    APP_CHANGE_CART_SUM
} from "../app/actions";

const defaultState = {
    dataUsers:[],
    dataServices:{
        kotiki:[],
        pesiki:[]
    },
    dataOrders: [],
    currentUser:{
        id:0,
        root:false
    },
    cartArray: [],
    cartGroup:'',
    cartSum:0
};

export const appReducer = (state = defaultState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case APP_CHANGE_DATA_USERS :
            return {
                ...state,
                dataUsers:action.payload
            };

        case APP_CHANGE_DATA_SERVICES :
            return {
                ...state,
                dataServices:action.payload
            };

        case APP_CHANGE_DATA_ORDERS :
            return {
                ...state,
                dataOrders:action.payload
            };

        case APP_CHANGE_CURRENT_USER :
            return {
                ...state,
                currentUser:action.payload
            };

        case APP_CHANGE_CART_ARRAY :
            return {
                ...state,
                cartArray:action.payload
            };

        case APP_CHANGE_CART_GROUP :
            return {
                ...state,
                cartGroup:action.payload
            };

        case APP_CHANGE_CART_SUM :
            return {
                ...state,
                cartSum:action.payload
            }
    }
    return state
};