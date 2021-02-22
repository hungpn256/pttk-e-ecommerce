import { toast } from 'react-toastify';
import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionsProduct from './../Actions/product';
import * as constantsProduct from './../Contants/product';
import servicesProduct from './../Service/product';
function* fetchProductListSaga({ payload }) {
  try {
    yield put(actionsProduct.changeStates({ isLoadingProduct: true }));
    let payloadCurrent = payload;
    if (!payload) {
      payloadCurrent = yield select((state) => state.product.paging);
    }
    const res = yield call(servicesProduct.get, payloadCurrent);
    const { Products, total } = res?.data;
    yield put({
      type: constantsProduct.FETCH_PRODUCT_SUCCESS,
      payload: { listProduct: Products, total },
    });
  } catch (e) {
    toast.error(e.message);
  } finally {
    yield put(actionsProduct.changeStates({ isLoadingProduct: false }));
  }
}
function* fetchProductListTypeSaga() {
  try {
    yield put(actionsProduct.changeStates({ isLoadingType: true }));
    const res = yield call(servicesProduct.getType, {});
    const { ProductTypes, total } = res?.data;
    if (ProductTypes) {
      yield put(actionsProduct.fetchProductListTypeSuccess(ProductTypes));
    } else {
      const { error } = res?.data;
      yield put(actionsProduct.fetchProductListTypeFail(error));
    }
  } catch (e) {
    toast.error(e.message);
  } finally {
    yield put(actionsProduct.changeStates({ isLoadingType: false }));
  }
}
function* fetchProductDetailSaga({ payload }) {
  try {
    const { _id } = payload;
    const res = yield call(servicesProduct.getProductDetail, _id);
    const { Product } = res?.data;
    if (Product) {
      yield put(actionsProduct.fetchProductDetailSuccess(Product));
    } else {
      const { error } = res;
      yield put(actionsProduct.fetchProductDetailFail(error));
    }
  } catch (e) {
    toast.error(e.message);
  }
}
function* searchProductNameSaga({ payload }) {
  try {
    yield delay(500);
    yield put(actionsProduct.changeStates({ isSearching: true }));
    const res = yield call(servicesProduct.searchProduct, payload);
    debugger;
    yield put(actionsProduct.changeStates({ listProductSearch: res.data?.Products }));
  } catch (e) {
    toast.error(e.message);
  } finally {
    yield put(actionsProduct.changeStates({ isSearching: false }));
  }
}
function* rootSaga() {
  yield takeLatest(constantsProduct.FETCH_PRODUCT, fetchProductListSaga);
  yield takeEvery(constantsProduct.FETCH_PRODUCT_TYPE, fetchProductListTypeSaga);
  yield takeEvery(constantsProduct.FETCH_PRODUCT_DETAIL, fetchProductDetailSaga);
  yield takeLatest(constantsProduct.SEARCH_PRODUCT_NAME, searchProductNameSaga);
}
export default rootSaga;
