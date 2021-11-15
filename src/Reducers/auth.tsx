import * as typesAuthentication from '../Constants/authentication';
import { Customer } from '../models/customer';

export interface IInitialStateAuth {
  prePath: string,
  loginSuccess: boolean,
  token: string,
  customer?: Customer,
  isLoading: boolean,
  first: true
}

const initialState: IInitialStateAuth = {
  prePath: '',
  loginSuccess: false,
  token: localStorage.getItem('token') || '',
  customer: undefined,
  isLoading: false,
  first: true
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
    case typesAuthentication.GET_TOKEN: {
      return { ...state };
    }
    //login
    case typesAuthentication.LOGIN_SUCCESS: {
      const { payload } = action;
      debugger;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`;
      return {
        ...state,
        ...payload,
        loginSuccess: true,
      };
    }
    case typesAuthentication.LOGIN_FAIL: {
      return { ...state };
    }
    //loading
    case typesAuthentication.SHOW_LOADING: {
      return { ...state, isLoading: true };
    }
    case typesAuthentication.HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    //getUser
    case typesAuthentication.GET_USER_SUCCESS: {
      const { payload } = action;
      return { ...state, ...payload };
    }
    case typesAuthentication.GET_USER_FAIL: {
      return { ...state };
    }
    //log out
    case typesAuthentication.LOG_OUT: {
      window.location.reload();
      localStorage.removeItem('token');
      return { ...initialState };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
