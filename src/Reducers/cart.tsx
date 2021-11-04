import IProduct from '../Interfaces/product';
import * as typeProducts from '../Constants/product';
import { IProductType } from '../Components/ProductType';
interface IInitialState {
  listProduct: Array<IProduct>;
}

const initialState: IInitialState = {
  listProduct: [],
};
interface IAction {
  type: string;
  payload: IProduct;
}
const reducer = (state = { ...initialState }, action: IAction) => {
  switch (action.type) {
    case typeProducts.CHANGE_STATE: {
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
