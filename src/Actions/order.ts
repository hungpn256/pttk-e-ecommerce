import { ADD_TO_CART, GET_CURRENT_CART } from "../Constants/order";

export const addToCart = (payload:any) => ({
  type: ADD_TO_CART,
  payload
})
export const getCurrentCart = (payload:any) => ({
  type: GET_CURRENT_CART,
  payload
})
