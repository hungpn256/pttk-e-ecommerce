import { toast } from 'react-toastify';
import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as actionsProduct from './../Actions/product';
import * as constantsProduct from '../Constants/product';
import * as constantsAuthentication from '../Constants/authentication';
import * as constantsOrder from '../Constants/order';
import * as actionsAuthen from './../Actions/authentication';
import servicesPublic from '../Service/public';
import axios from 'axios';
import { Customer } from '../models/customer';
import { Cart, Order, Payment, Shipment } from '../models/order';
import { BookItem } from '../models/book';
function* fetchProductListSaga() {
  try {
    yield put(actionsProduct.changeStates({ isLoadingProduct: true }));
    const res: { data: BookItem[] } = yield call(servicesPublic.get);
    const product = res?.data.reverse();
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

function* fetchBookDetailSaga({ payload }: any) {
  try {
    const { _id } = payload;
    const res: { data: BookItem } = yield call(servicesPublic.getBookItemDetail, _id);
    const bookItem = res?.data;
    if (bookItem) {
      yield put(actionsProduct.fetchProductDetailSuccess(bookItem));
    } else {
      yield put(actionsProduct.fetchProductDetailFail({ error: 'false' }));
    }
  } catch (e: any) {
    toast.error(e.message);
  }
}
function* searchProductNameSaga({ payload }: { payload: string }) {
  try {
    yield delay(500);
    yield put(actionsProduct.changeStates({ isSearching: true }));
    yield delay(500);
    const res: { data: BookItem[] } = yield call(servicesPublic.get, { key: payload });
    yield put(actionsProduct.changeStates({ listBookItemSearch: res?.data ?? [] }));
  } catch (e: any) {
    toast.error(e.message);
  } finally {
    yield put(actionsProduct.changeStates({ isSearching: false }));
  }
}

function* loginSaga({ payload }: { payload: any }) {
  try {
    yield put(actionsAuthen.showLoading());
    const res: { data: { token: string, customer: Customer } } = yield call(servicesPublic.login, payload);
    const customer = res?.data?.customer ?? '';
    const token = res?.data?.token;
    debugger;
    if (customer) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;
      yield put(actionsAuthen.loginSuccess({ customer, token }));
      yield put({ type: constantsOrder.GET_CURRENT_CART })
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
    const res: { data: Customer } = yield call(servicesPublic.signUp, payload);
    if (res?.data) {
      yield put(actionsAuthen.signupSuccess(res.data));
      window.location.replace('/login')
      toast.success('Đăng ký thành công');
    }
  } catch (e: any) {
    toast.error(e?.response?.data?.message);
  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}
function* getUserSaga() {
  try {
    yield put(actionsAuthen.showLoading());
    axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('token')}`;
    const res: { data: { token: string, customer: Customer } } = yield call(servicesPublic.getUser);
    if (!!res.data?.customer) {
      const customer = res?.data?.customer ?? '';
      const token = res?.data?.token;
      yield put(actionsAuthen.loginSuccess({ customer, token }));
      yield put({ type: constantsOrder.GET_CURRENT_CART })
    } else {
      yield put(actionsAuthen.getUserFail({ message: 'lỗi đăng nhập' }));
    }
  } catch (error) {
    yield put(actionsAuthen.getUserFail(error));
  } finally {
    // yield put({ type: constantsAuthentication.CHANGE_STATE_AUTHENTICATION, payload: { first: false } });
    yield put(actionsAuthen.hideLoading());
  }
}

function* getCurrentCart() {
  try {
    yield put(actionsAuthen.showLoading());
    const res: { data: Cart } = yield call(servicesPublic.getCurrentCart);
    if (!!res.data) {
      yield put({ type: constantsOrder.GET_CURRENT_CART_SUCCESS, payload: res.data });
    } else {
      yield put({ type: constantsOrder.GET_CURRENT_CART_FAIL, payload: { err: "false" } });
    }
  } catch (error) {
    console.log(error);

  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}

function* addToCartSaga({ payload }: any) {
  try {
    yield put(actionsAuthen.showLoading());
    const res: { data: Cart } = yield call(servicesPublic.addToCart, payload);
    if (!!res.data) {
      yield put({ type: constantsOrder.GET_CURRENT_CART_SUCCESS, payload: res.data });
      window.location.replace('/cart')
      toast.success("thêm vào giỏ hàng thành công!!")
    } else {
      yield put({ type: constantsOrder.GET_CURRENT_CART_FAIL, payload: { err: "false" } });
    }
  } catch (error) {
    console.log(error);

  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}

function* getPaymentSaga({ payload }: any) {
  try {
    yield put(actionsAuthen.showLoading());
    const res: { data: Payment[] } = yield call(servicesPublic.getPayment, payload);
    if (!!res.data) {
      yield put({ type: constantsOrder.GET_ALL_PAYMENT_SUCCESS, payload: res.data });
    } else {
      yield put({ type: constantsOrder.GET_ALL_PAYMENT_FAIL, payload: { err: "false" } });
    }
  } catch (error) {
    console.log(error);

  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}

function* getShipmentSaga() {
  try {
    yield put(actionsAuthen.showLoading());
    const res: { data: Shipment[] } = yield call(servicesPublic.getShipment);
    if (!!res.data) {
      yield put({ type: constantsOrder.GET_ALL_SHIPMENT_SUCCESS, payload: res.data });
    } else {
      yield put({ type: constantsOrder.GET_ALL_SHIPMENT_FAIL, payload: { err: "false" } });
    }
  } catch (error) {
    console.log(error);

  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}


function* createOrderSaga({ payload }: any) {
  try {
    yield put(actionsAuthen.showLoading());
    console.log(payload, 'payyload order')
    const res: { data: Order } = yield call(servicesPublic.createOrder, payload);
    if (!!res.data) {
      yield put({ type: constantsOrder.ADD_ORDER_SUCCESS, payload: res.data });
      yield put({ type: constantsOrder.GET_CURRENT_CART });
      window.history.back()
    } else {
      yield put({ type: constantsOrder.ADD_ORDER_FAIL, payload: { err: "false" } });
    }
  } catch (error) {
    console.log(error);

  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}

function* getAllOrderSaga({ payload }: { payload: number }) {
  try {
    yield put(actionsAuthen.showLoading());
    const res: { data: Order[] } = yield call(servicesPublic.getAllOrder);
    if (!!res.data) {
      yield put({ type: constantsOrder.GET_ALL_ORDER_SUCCESS, payload: res.data });
    } else {
      toast.error("get order fail")
      yield put({ type: constantsOrder.GET_ALL_ORDER_FAIL, payload: { err: "false" } });
    }
  } catch (error) {
    toast.error("get order fail")
    console.log(error);

  } finally {
    yield put(actionsAuthen.hideLoading());
  }
}

function* rootSaga() {
  yield takeLatest(constantsProduct.FETCH_PRODUCT, fetchProductListSaga);
  yield takeEvery(constantsProduct.FETCH_PRODUCT_DETAIL, fetchBookDetailSaga);
  yield takeLatest(constantsProduct.SEARCH_PRODUCT_NAME, searchProductNameSaga);
  yield takeLatest(constantsAuthentication.LOGIN, loginSaga);
  yield takeEvery(constantsAuthentication.SIGN_UP, signUpSaga);
  yield takeLatest(constantsAuthentication.GET_USER, getUserSaga);
  yield takeLatest(constantsOrder.GET_CURRENT_CART, getCurrentCart);
  yield takeLatest(constantsOrder.ADD_TO_CART, addToCartSaga);
  yield takeLatest(constantsOrder.GET_ALL_PAYMENT, getPaymentSaga);
  yield takeLatest(constantsOrder.GET_ALL_SHIPMENT, getShipmentSaga);
  yield takeLatest(constantsOrder.ADD_ORDER, createOrderSaga);
  yield takeLatest(constantsOrder.GET_ALL_ORDER, getAllOrderSaga);
}
export default rootSaga;
