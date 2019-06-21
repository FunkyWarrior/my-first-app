import {combineReducers} from "redux";


import {authReducer} from "./auth/reducers";
import {registrationReducer} from "./registration/reducers";
import {appReducer} from "./app/reducers";


export default combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    app: appReducer
})