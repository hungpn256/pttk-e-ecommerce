import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  background: { background: '#f5f5f5', minHeight: '100vh' },
  cardMain: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  wrapperImageMain: {
    width: 450,
    height: 450,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageMain: {
    width: 420,
    height: 420,
    borderRadius: 5,
  },
  infoProduct: {
    width: 750,
  },
  nameProduct: {
    color: 'rgb(36,36,36)',
    fontSize: 28,
    fontWeight: 300,
    lineHeight: '32px',
    marginTop: 10,
  },

  rating: {
    margin: 10,
    marginBottom: 20,
  },
  price: {
    fontWeight: 500,
    fontSize: 28,
    backgroundColor: '#f5f5f5',
    width: 500,
    maxHeight: 120,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    color: 'red',
    marginBottom: 10,
  },
  vnd: {
    fontFamily: 'Helvet',
    textDecoration: 'underline',
  },
  askAdress: {
    fontSize: 14,
    width: 500,
    margin: '10px 0',
  },
  inputNumber: {
    fontSize: 20,
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
  amount: {
    fontSize: 18,
    margin: ' 10px 0',
  },
  btnNumber: {
    width: 20,
    height: 40,
    border: '1px solid #f3f3f3',
  },
  textFieldNumber: {
    '& input': {
      fontSize: 30,
      padding: 10,
      textAlign: 'center',
      color: 'black',
    },
  },
  btnBuy: {
    width: 300,
    height: 50,
    marginTop: 10,
  },
  cardDes: {
    marginTop: 20,
    marginBottom: 20,
    padding: '20px 0',
    '& li': {
      padding: '0 20px'
    }
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}));

export default styles;
