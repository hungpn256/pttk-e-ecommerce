import { makeStyles } from '@material-ui/core/styles';
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
    height: 700
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    border: '2px solid #000',
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: '#333',
    marginTop: 40,
    marginBottom: 10
  }
}));
export default styles;
