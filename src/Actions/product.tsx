import * as typesProduct from '../Constants/product';
import IProduct from './../Interfaces/product';
export const fetchProductList = (payload: any) => ({
  type: typesProduct.FETCH_PRODUCT,
  payload,
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

export const fetchProductDetailSuccess = (productDetail: IProduct) => ({
  type: typesProduct.FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: { productDetail },
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
