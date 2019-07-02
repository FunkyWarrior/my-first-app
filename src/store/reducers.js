import {combineReducers} from "redux";


import {authReducer} from "./auth/reducers";

import {appReducer} from "./app/reducers";


export default combineReducers({
    auth: authReducer,
    app: appReducer
})