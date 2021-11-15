import * as typeOrders from '../Constants/order';
import { Cart, Order, Payment, Shipment } from '../models/order'
export interface IInitialStateCart {
  cart?: Cart;
  error: string;
  payment: Payment[];
  shipment: Shipment[];
  listOrder: Order[];
}

const initialState: IInitialStateCart = {
  cart: undefined,
  error: "",
  payment: [],
  shipment: [],
  listOrder: []
};
const reducer = (state = { ...initialState }, action: any) => {
  switch (action.type) {
    case typeOrders.CHANGE_STATE_ORDER: {
      const { payload } = action;
      return {
        ...state,
        ...payload,
      };
    }
    case typeOrders.GET_CURRENT_CART_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        cart: payload,
      };
    }
    case typeOrders.GET_ALL_PAYMENT_SUCCESS: {
      return {
        ...state,
        payment: action.payload,
      }
    }
    case typeOrders.GET_ALL_SHIPMENT_SUCCESS: {
      return {
        ...state,
        shipment: action.payload,
      }
    }
    case typeOrders.GET_ALL_ORDER_SUCCESS: {
      return {
        ...state,
        listOrder: action.payload
      }
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
