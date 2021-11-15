import axios from 'axios';
import { url } from '../Configures/ip';
class ServicesProduct {
  get = async (payload?: { key: string }) => {
    return await axios.get(`${url}/book/book-item`, { params: { ...payload } });
  };
  getType = async (payload: object) => {
    return await axios.get(`${url}/product-type`, { params: payload });
  };
  getBookItemDetail = async (_id: string) => {
    return await axios.get(`${url}/book/book-item/${_id}`);
  };
  searchProduct = async (payload: object) => {
    return await axios.get(`${url}/product/search`, { params: { name: payload } });
  };
  login = async (payload: object) => {
    return await axios.post(`${url}/auth/login/`, payload);
  };
  signUp = async (payload: object) => {
    return await axios.post(`${url}/auth/register`, payload);
  };
  getUser = async () => {
    return await axios.get(`${url}/auth/me`);
  };
  getCurrentCart = async () => {
    return await axios.get(`${url}/order/get-cart`);
  }
  addToCart = async (payload: any) => {
    return await axios.post(`${url}/order/add-to-cart`, payload);
  }
  getPayment = async (payload: number) => {
    return await axios.get(`${url}/order/payment`, { params: { id: payload } });
  }
  getShipment = async () => {
    return await axios.get(`${url}/order/shipment`);
  }
  createOrder = async (payload: any) => {
    return await axios.post(`${url}/order/create-order`, payload);
  }
  getAllOrder = async () => {
    return await axios.get(`${url}/order/my-order`);
  }
  getOrderDetail = async (payload: number) => {
    return await axios.get(`${url}/order/my-order/${payload}`);
  }
}
export default new ServicesProduct();
