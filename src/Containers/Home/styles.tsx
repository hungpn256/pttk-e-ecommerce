import { makeStyles } from '@material-ui/core/styles';
import theme from '../App/themes';
const styles = makeStyles(() => ({
  home: {
    backgroundColor: '#F5F5F5',
  },
  content: {
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  listProduct: {},
  listProductType: {
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  advertisement: {
    width: '100%',
    height: 252,
    display: 'flex',
    flexWrap: 'wrap',
  },
  carousel: {
    width: '69%',
    height: '100%',
    margin: '0.5%',
  },
  imageAdvertisement: {
    width: '29%',
    height: '100%',
    margin: '0.5%',
  },
}));
export default styles;
