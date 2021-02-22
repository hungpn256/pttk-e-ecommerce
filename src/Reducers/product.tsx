import IProduct from '../Interfaces/product';
import * as typeProducts from '../Contants/product';
import { IProductType } from '../Components/ProductType';
interface IInitialState {
  listProduct: Array<IProduct>;
  listProductType: Array<IProductType>;
  total: number;
  paging: {
    limit: number;
    page: number;
    cond: object;
  };
  record: IProduct | {};
  isLoadingProduct: boolean;
  isLoadingType: boolean;
  listProductSearch: Array<IProduct>;
  isSearching: boolean;
}

const initialState: IInitialState = {
  listProduct: [],
  listProductType: [],
  total: 0,
  paging: {
    limit: 24,
    page: 1,
    cond: {},
  },
  record: {},
  isLoadingProduct: false,
  isLoadingType: false,
  listProductSearch: [],
  isSearching: false,
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
    case typeProducts.FETCH_PRODUCT: {
      return { ...state };
    }
    case typeProducts.FETCH_PRODUCT_SUCCESS: {
      const { listProduct, total } = action.payload;
      return { ...state, listProduct, total };
    }
    case typeProducts.FETCH_PRODUCT_TYPE_SUCCESS: {
      const { listProductType } = action.payload;
      return { ...state, listProductType };
    }
    case typeProducts.FETCH_PRODUCT_DETAIL_SUCCESS: {
      const { productDetail } = action.payload;
      return { ...state, record: productDetail };
    }
    default: {
      return { ...state };
    }
  }
};
export default reducer;
