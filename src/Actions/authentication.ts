import * as typesAuthen from '../Constants/authentication';


//login
export const login=(payload)=>({
  type:typesAuthen.LOGIN,
  payload
})
export const loginSuccess=(payload)=>({
  type:typesAuthen.LOGIN_SUCCESS,
  payload
})
export const loginFail=(err)=>({
  type:typesAuthen.LOGIN_FAIL,
  err
})

//log out
export const logOut=()=>({
  type:typesAuthen.LOG_OUT
})

//sign up
export const signup=(payload)=>({
  type:typesAuthen.SIGN_UP,
  payload
})
export const signupSuccess=(payload)=>({
  type:typesAuthen.SIGN_UP_SUCCESS,
  payload
})
export const signupFail=(err)=>({
  type:typesAuthen.SIGN_UP_FAIL,
  err
})
//get user
export const getUser=()=>({
  type: typesAuthen.GET_USER
})
export const getUserSuccess=(payload)=>({
  type: typesAuthen.GET_USER_SUCCESS,
  payload
})
export const getUserFail=(err)=>({
  type: typesAuthen.GET_USER_FAIL,
  err
})


//loading
export const showLoading=()=>({
  type:typesAuthen.SHOW_LOADING
})
export const hideLoading=()=>({
  type:typesAuthen.HIDE_LOADING
})

export const changeStates = (payload) => ({
  type: typesAuthen.CHANGE_STATE_AUTHENTICATION,
  payload,
});
// get token
export const getToken = () => ({
  type: typesAuthen.GET_TOKEN
})
