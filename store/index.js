import userReducer from './reducers/userReducer';
import listReducer from  './reducers/listReducer';

import {combineReducers} from 'redux';

const allReducers = combineReducers({
    userReducer: userReducer,
    listReducer: listReducer,
});

export default allReducers;