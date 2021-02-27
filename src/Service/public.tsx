import axios from 'axios';
import { url } from '../Configures/ip';
class ServicesProduct {
  get = async (payload: object) => {
    return await axios.get(`${url}/product`, { params: payload });
  };
  getType = async (payload: object) => {
    return await axios.get(`${url}/product-type`, { params: payload });
  };
  getProductDetail = async (_id: string) => {
    return await axios.get(`${url}/product/${_id}`);
  };
  searchProduct = async (payload: object) => {
    return await axios.get(`${url}/product/search`, { params: { name: payload } });
  };
  login = async (payload: object) => {
    return await axios.post(`${url}/auth/signin`, payload);
  };
  signUp = async (payload: object) => {
    return await axios.post(`${url}/auth/signup`, payload);
  };
}
export default new ServicesProduct();
