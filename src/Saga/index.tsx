import { call, delay, fork, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import * as constantsProduct from './../Contants/product';
import servicesProduct from './../Service/product';
import * as actionsProduct from './../Actions/product';
function* fetchProductListSaga() {
  const res = yield call(servicesProduct.get, {});
  const { Products, total } = res?.data;
  yield put({
    type: constantsProduct.FETCH_PRODUCT_SUCCESS,
    payload: { listProduct: Products, total },
  });
}
function* fetchProductListTypeSaga() {
  const res = yield call(servicesProduct.getType, {});
  const { ProductTypes, total } = res?.data;
  if (ProductTypes) {
    yield put(actionsProduct.fetchProductListTypeSuccess(ProductTypes));
  } else {
    const { error } = res?.data;
    yield put(actionsProduct.fetchProductListTypeFail(error));
  }
}
function* fetchProductDetailSaga({ payload }) {
  const { _id } = payload;
  const res = yield call(servicesProduct.getProductDetail, _id);
  const { Product } = res?.data;
  if (Product) {
    yield put(actionsProduct.fetchProductDetailSuccess(Product));
  } else {
    const { error } = res;
    yield put(actionsProduct.fetchProductDetailFail(error));
  }
}
function* rootSaga() {
  yield takeEvery(constantsProduct.FETCH_PRODUCT, fetchProductListSaga);
  yield takeEvery(constantsProduct.FETCH_PRODUCT_TYPE, fetchProductListTypeSaga);
  yield takeEvery(constantsProduct.FETCH_PRODUCT_DETAIL, fetchProductDetailSaga);
}
export default rootSaga;
