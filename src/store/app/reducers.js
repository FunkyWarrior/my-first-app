import {
    GET_REQUEST ,
    GET_REQUEST_SUCCESS ,
    GET_REQUEST_FAIL,

    PUT_REQUEST ,
    PUT_REQUEST_SUCCESS,
    PUT_REQUEST_FAIL,

    APP_CREATE_CART,
    APP_CHANGE_CART_PRODUCT,

    APP_SET_DATA,
    APP_CLEAR_DATA

} from "../app/actions";


const defaultState = {
    dataServices: localStorage.getItem('dataServices') ? JSON.parse(localStorage.getItem('dataServices')) : {
        kotiki:[],
        pesiki:[]
    },
    dataOrders: localStorage.getItem('dataOrders') ? JSON.parse(localStorage.getItem('dataOrders')) :
        [{
            date:'',
            id:0,
            order:[{
                count:0,
                group:'',
                id:0,
                productId: 0
            }],
            status:'',
            totalSum:0,
            userId:0
        }],
    cartArray: localStorage.getItem('cartArray') ? JSON.parse(localStorage.getItem('cartArray')) : [],
    cartSum:localStorage.getItem('cartSum') ? JSON.parse(localStorage.getItem('cartSum')) : 0,
    counter:localStorage.getItem('counter') ? JSON.parse(localStorage.getItem('counter')) : 1,
    currentModal:false,
    alert:null,
    isFetching:false,
    error:null
};

export const appReducer = (state = defaultState, action) => {
    switch (action.type) {
// -----------------------------------------------------------------------------------------------------------------

        case APP_SET_DATA : {
            return {
                ...state,
                [action.payload.path]:action.payload.data

            }
        }

        case APP_CLEAR_DATA : {
            return {
                ...state,
                currentModal:false,
                alert:null,
                cartArray: [],
                cartSum:0,
                counter:1,
                isFetching:false,
                error:null
            }
        }

// -----------------------------------------------------------------------------------------------------------------

        case GET_REQUEST : {
            return {
                ...state,
                isFetching: true
            };
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
            return {
                ...state,
                isFetching: true
            };
        }

        case PUT_REQUEST_SUCCESS: {
            return {
                ...state,
                cartArray:[],
                cartSum:0,
                isFetching: false,
                counter:1,
                dataOrders:action.payload
            }
        }

        case PUT_REQUEST_FAIL: {
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            }
        }

// -----------------------------------------------------------------------------------------------------------------
        case APP_CREATE_CART :
            const {currentUser,event} = action.payload;
            if (currentUser.id !==0) {
                const product = state.dataServices[`${event.target.name}`].find(s => s.id === +event.target.id);
                const check = state.cartArray.find(c => c.productId === +event.target.id && c.group === event.target.name);
                if (check) {
                    return {
                        ...state,
                        cartArray:state.cartArray.map(el => el.productId === +event.target.id && el.group === event.target.name
                            ? {
                                ...el,
                                count:el.count + 1
                            }
                        : el),
                        cartSum:state.cartSum+product.price
                    };
                } else return {
                        ...state,
                        cartArray:[...state.cartArray,
                            {
                                group: event.target.name,
                                productId: +event.target.id,
                                count: 1,
                                id: state.counter
                            }],
                        showCart:true,
                        cartSum: state.cartSum + product.price,
                        counter:state.counter + 1
                    }

            } else return {
                ...state,
                alert:'Please Log In'
            };

// -----------------------------------------------------------------------------------------------------------------

        case APP_CHANGE_CART_PRODUCT :
            const productChange = state.dataServices[`${action.payload.target.name}`].find(el => el.id === +action.payload.target.id);
            const newCartArray = state.cartArray.slice();
            const changedElement = newCartArray.find(el => el.productId === +action.payload.target.id && el.group === action.payload.target.name);
            switch (action.payload.target.innerText){

                case 'X' :
                    let sum = changedElement.count * productChange.price;
                    newCartArray.splice(newCartArray.indexOf(changedElement),1);
                    return {
                        ...state,
                        cartArray: newCartArray,
                        cartSum: state.cartSum - sum,
                        counter: newCartArray.length === 0 ? 1 : state.counter

                    };

                case '+' :
                    return {
                        ...state,
                        cartArray: state.cartArray.map(el => el.productId === +action.payload.target.id && el.group === action.payload.target.name ?
                            {...el,
                                count:el.count+1
                            }
                            :el),
                        cartSum:state.cartSum + productChange.price
                    };

                case '-' :
                    if (changedElement.count > 0){
                        changedElement.count = changedElement.count -1
                    }
                    if (changedElement.count === 0){
                        newCartArray.splice(newCartArray.indexOf(changedElement),1)
                    }

                    return {
                        ...state,
                        cartArray: newCartArray,
                        cartSum: state.cartSum - productChange.price,
                        counter: newCartArray.length === 0 ? 1 : state.counter
                    };

                default:
                    return state;
            }

        default:
            return state
    }

};