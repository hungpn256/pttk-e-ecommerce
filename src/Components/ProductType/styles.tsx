import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  linkProductType: {
    textDecoration: 'none',
    color: theme.color.textDark,
  },
  productType: {
    width: 120,
    height: 150,
    boxShadow: 'none',
    border: '1px solid #f5f5f5',
    '&:hover': {
      border: '1px solid rgba(0,0,0,0.3)',
    },
  },
  imgProductType: {
    width: 80,
  },
  imageWrapper: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperName: {
    width: 100,
    margin: '0 auto',
    marginTop: -5,
  },
  nameProductType: {
    textAlign: 'center',
    fontSize: 14,
  },
  active: {
    background: 'rgba(242,242,242,0.9)',
  },
}));

export default styles;
