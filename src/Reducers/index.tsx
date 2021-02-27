import { combineReducers } from 'redux';
import product from './product';
import user from './user';
const rootReducer = combineReducers({ product, user });
export default rootReducer;
