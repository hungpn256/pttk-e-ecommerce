import { makeStyles } from '@material-ui/core/styles';
import theme from '../App/themes';
const styles = makeStyles(() => ({
  cart: {
    height: '100%',
  },
  cart__container: {
    width: 1440,
    maxWidth: '100%',
    margin: '0 auto',
  },
  cart__title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    margin: '30px 30px'
  },
  cart__table: {
    height: 500
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    minWidth: 300
  }
}));
export default styles;
