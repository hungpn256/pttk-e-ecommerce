import axios from 'axios';
import { url } from './../Configures/ip';
class ServicesProduct {
  get = async (payload: object) => {
    return await axios.get(`${url}/product`, { params: payload });
  };
  getType = async (payload: object) => {
    return await axios.get(`${url}/product-type`, payload);
  };
  getProductDetail = async (_id: string) => {
    return await axios.get(`${url}/product/${_id}`);
  };
}
export default new ServicesProduct();
