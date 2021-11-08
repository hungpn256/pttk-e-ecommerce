import * as typesProduct from '../Constants/product';
import IProduct from './../Interfaces/product';
export const fetchProductList = () => ({
  type: typesProduct.FETCH_PRODUCT,
});

export const fetchProductListSuccess = (listProduct: Array<IProduct>, total: number) => ({
  type: typesProduct.FETCH_PRODUCT_SUCCESS,
  payload: { listProduct, total },
});

export const fetchProductListFail = (err: object) => ({
  type: typesProduct.FETCH_PRODUCT_FAIL,
  payload: { err },
});

export const fetchProductListType = () => ({
  type: typesProduct.FETCH_PRODUCT_TYPE,
  payload: {},
});

export const fetchProductListTypeSuccess = (listProductType: Array<IProduct>) => ({
  type: typesProduct.FETCH_PRODUCT_TYPE_SUCCESS,
  payload: { listProductType },
});

export const fetchProductListTypeFail = (err: object) => ({
  type: typesProduct.FETCH_PRODUCT_TYPE_FAIL,
  payload: { err },
});

export const fetchProductDetail = (_id: string) => ({
  type: typesProduct.FETCH_PRODUCT_DETAIL,
  payload: { _id },
});

export const fetchProductDetailSuccess = (bookDetail: IProduct) => ({
  type: typesProduct.FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: bookDetail
});

export const fetchProductDetailFail = (err: object) => ({
  type: typesProduct.FETCH_PRODUCT_DETAIL_FAIL,
  payload: { err },
});

export const changeStates = (payload) => ({
  type: typesProduct.CHANGE_STATE,
  payload,
});

export const searchProductName = (payload) => ({
  type: typesProduct.SEARCH_PRODUCT_NAME,
  payload,
});
