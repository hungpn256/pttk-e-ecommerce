import axios from 'axios';
import { url } from '../Configures/ip';
class ServicesProduct {
  get = async () => {
    return await axios.get(`${url}/book/book-item`);
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
}
export default new ServicesProduct();
