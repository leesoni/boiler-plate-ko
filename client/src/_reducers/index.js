// combineReducers로 reducer 합쳐주기
import { combineReducers } from "redux";
import user from './user_reducer';

const rootReducer = combineReducers({
    user,
})

export default rootReducer;

