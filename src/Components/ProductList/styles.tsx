import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  productList: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  title: {
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'uppercase',
    '& span': {
      fontSize: 18,
    },
  },
  pagination: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default styles;
