import { toast } from 'react-toastify';
import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionsProduct from './../Actions/product';
import * as constantsProduct from '../Constants/product';
import * as constantsAuthentication from '../Constants/authentication';
import * as actionsAuthen from './../Actions/authentication';
import servicesPublic from '../Service/public';
import axios from 'axios';
function* fetchProductListSaga({ payload }) {
  try {
    yield put(actionsProduct.changeStates({ isLoadingProduct: true }));
    let payloadCurrent = payload;
    if (!payload) {
      payloadCurrent = yield select((state) => state.product.paging);
    }
    const res = yield call(servicesPublic.get, payloadCurrent);
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
    const res = yield call(servicesPublic.getType, {});
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
    const res = yield call(servicesPublic.getProductDetail, _id);
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
    const paging = yield select((state) => state.product.paging);
    const res = yield call(servicesPublic.get, { ...paging, search: payload });

    yield put(actionsProduct.changeStates({ listProductSearch: res.data?.Products }));
  } catch (e) {
    toast.error(e.message);
  } finally {
    yield put(actionsProduct.changeStates({ isSearching: false }));
  }
}

function* loginSaga({ payload }: { payload: any }) {
  try {
    yield put(actionsAuthen.showLoading());
    const res = yield call(servicesPublic.login, payload);
    const token = res?.data?.token ?? '';
    if (token) {
      localStorage.setItem('token', token);
      yield put(actionsAuthen.loginSuccess({ token }));
      yield put(actionsAuthen.getUser());
    }
  } catch (e) {
    yield put(actionsAuthen.loginFail(e));
    toast.error('Đăng nhập thất bại');
  } finally {
    yield delay(500);
    yield put(actionsAuthen.hideLoading());
  }
}

function* signUpSaga({ payload }) {
  try {
    yield put(actionsAuthen.showLoading());
    const res = yield call(servicesPublic.signUp, payload);
  } catch (e) {
    toast.error('Đăng kí thất bại');
  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}
function* getUserSaga() {
  try {
    yield put(actionsAuthen.showLoading());
    axios.defaults.headers.common['Authorization'] = `Beare ${localStorage.getItem('token')}`;
    const res = yield call(servicesPublic.getUser);
    if (!!res.data.user) {
      yield put(actionsAuthen.getUserSuccess(res.data));
    } else {
      yield put(actionsAuthen.getUserFail({ message: 'lỗi đăng nhập' }));
    }
  } catch (error) {
    yield put(actionsAuthen.getUserFail(error));
  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}
function* rootSaga() {
  yield takeLatest(constantsProduct.FETCH_PRODUCT, fetchProductListSaga);
  yield takeEvery(constantsProduct.FETCH_PRODUCT_TYPE, fetchProductListTypeSaga);
  yield takeEvery(constantsProduct.FETCH_PRODUCT_DETAIL, fetchProductDetailSaga);
  yield takeLatest(constantsProduct.SEARCH_PRODUCT_NAME, searchProductNameSaga);
  yield takeLatest(constantsAuthentication.LOGIN, loginSaga);
  yield takeLatest(constantsAuthentication.SIGN_UP, signUpSaga);
  yield takeLatest(constantsAuthentication.GET_USER, getUserSaga);
}
export default rootSaga;
