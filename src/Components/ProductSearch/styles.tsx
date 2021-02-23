import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    margin: 2,
  },
  image: {
    width: 70,
    margin: 10,
  },
  name: {
    margin: '5px 0',
    display: '-wetkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  price: {
    color: 'red',
  },
}));

export default styles;
