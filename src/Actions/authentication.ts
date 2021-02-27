import * as typesAuthen from './../Contants/authentication';

export const login=(payload)=>({
  type:typesAuthen.LOGIN,
  payload
})

export const signup=(payload)=>({
  type:typesAuthen.SIGN_UP,
  payload
})
export const changeStates = (payload) => ({
  type: typesAuthen.CHANGE_STATE_AUTHENTICATION,
  payload,
});

