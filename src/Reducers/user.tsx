import IProduct from '../Interfaces/product';
import * as typesAuthentication from './../Contants/authentication';
interface IInitialState {}

const initialState: IInitialState = {
  hasUser: false,
  isLoading: false,
  email: '',
};
interface IAction {
  type: string;
  payload: any;
}
const reducer = (state = { ...initialState }, action: IAction) => {
  switch (action.type) {
    case typesAuthentication.CHANGE_STATE_AUTHENTICATION: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
