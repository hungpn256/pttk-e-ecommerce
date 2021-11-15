import * as typeProducts from '../Constants/product';
import { BookItem } from '../models/book';
export interface IInitialState {
  listProduct: BookItem[]
  record: BookItem | {};
  isLoadingProduct: boolean;
  isLoadingType: boolean;
  listBookItemSearch: Array<BookItem>;
  isSearching: boolean;
}

const initialState: IInitialState = {
  listProduct: [],
  record: {},
  isLoadingProduct: false,
  isLoadingType: false,
  listBookItemSearch: [],
  isSearching: false,
};
interface IAction {
  type: string;
  payload: any;
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
    case typeProducts.FETCH_PRODUCT: {
      return { ...state };
    }
    case typeProducts.FETCH_PRODUCT_SUCCESS: {
      const { listProduct } = action.payload;
      return { ...state, listProduct };
    }
    case typeProducts.FETCH_PRODUCT_SUCCESS: {
      const { listProduct } = action.payload;
      return { ...state, listProduct };
    }
    case typeProducts.FETCH_PRODUCT_DETAIL_SUCCESS: {
      return { ...state, record: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
