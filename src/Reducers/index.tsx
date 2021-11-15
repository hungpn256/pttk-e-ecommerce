import { combineReducers } from 'redux';
import product, { IInitialState } from './product';
import auth, { IInitialStateAuth } from './auth';
import cart, { IInitialStateCart } from './cart'
const rootReducer: { product: IInitialState, auth: IInitialStateAuth, cart: IInitialStateCart } = combineReducers({ product, auth, cart });
export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
