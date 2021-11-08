import { toast } from 'react-toastify';
import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionsProduct from './../Actions/product';
import * as constantsProduct from '../Constants/product';
import * as constantsAuthentication from '../Constants/authentication';
import * as actionsAuthen from './../Actions/authentication';
import servicesPublic from '../Service/public';
import axios from 'axios';
import { Customer } from '../models/customer';
function* fetchProductListSaga() {
  try {
    yield put(actionsProduct.changeStates({ isLoadingProduct: true }));
    const res = yield call(servicesPublic.get);
    const product = res?.data;
    yield put({
      type: constantsProduct.FETCH_PRODUCT_SUCCESS,
      payload: { listProduct: product },
    });
  } catch (e: any) {
    toast.error(e.message);
  } finally {
    yield put(actionsProduct.changeStates({ isLoadingProduct: false }));
  }
}

function* fetchProductDetailSaga({ payload }) {
  try {
    const { _id } = payload;
    const res = yield call(servicesPublic.getBookItemDetail, _id);
    const bookItem = res?.data;
    if (bookItem) {
      yield put(actionsProduct.fetchProductDetailSuccess(bookItem));
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

    const customer = res?.data?.customer ?? '';
    const token = res?.data?.token;
    debugger;
    if (customer) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;

      yield put(actionsAuthen.loginSuccess({ customer, token }));
    }
  } catch (e) {
    yield put(actionsAuthen.loginFail(e));
    toast.error('Đăng nhập thất bại');
  } finally {
    yield delay(500);
    yield put(actionsAuthen.hideLoading());
  }
}

function* signUpSaga({ payload }: { payload: Customer }) {
  try {
    yield put(actionsAuthen.showLoading());
    console.log('start');
    const res = yield call(servicesPublic.signUp, payload);
    if (res?.data) {
      yield put(actionsAuthen.signupSuccess(res.data));
      toast.success('Đăng ký thành công');
    }
  } catch (e) {
    toast.error(e?.response?.data?.message);
  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}
function* getUserSaga() {
  try {
    yield put(actionsAuthen.showLoading());
    axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;
    const res = yield call(servicesPublic.getUser);
    if (!!res.data?.customer) {
      const customer = res?.data?.customer ?? '';
      const token = res?.data?.token;
      yield put(actionsAuthen.loginSuccess({ customer, token }));
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
  yield takeEvery(constantsProduct.FETCH_PRODUCT_DETAIL, fetchProductDetailSaga);
  yield takeLatest(constantsProduct.SEARCH_PRODUCT_NAME, searchProductNameSaga);
  yield takeLatest(constantsAuthentication.LOGIN, loginSaga);
  yield takeEvery(constantsAuthentication.SIGN_UP, signUpSaga);
  yield takeLatest(constantsAuthentication.GET_USER, getUserSaga);
}
export default rootSaga;
