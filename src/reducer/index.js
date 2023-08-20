import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer
});

export default rootReducer;