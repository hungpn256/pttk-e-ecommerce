import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  product: {
    position: 'relative',
    width: 230,
    margin: 5,
    height: 285,
    '&:hover': {
      border: `2px solid ${theme.color.background}`,
      translateY: -5,
    },
    overflow: 'hidden',
  },
  media: {
    height: 190,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'cover'
  },
  description: {
    display: `-webkit-box`,
    lineClamp: 2,
    WebkitLineClamp: 3,
    WebkitBoxOrient: `vertical`,
    overflow: `hidden`,
    fontSize: 12,
    textDecoration: 'none',
    color: theme.color.textDark,
  },
  cardContent: {
    padding: 4,
  },
  price: {
    fontWeight: 700,
    position: 'absolute',
    bottom: 6,
  },
  vnd: {
    fontFamily: 'Helvet',
    textDecoration: 'underline',
  },
  rating: {
    width: 50,
  },
  itemLink: {
    textDecoration: 'none',
    color: theme.color.textDark,
  },
  disable: {
    pointerEvents: 'none',
    cursor: 'default',
  },
  name: {
    display: `-webkit-box`,
    lineClamp: 1,
    WebkitLineClamp: 3,
    WebkitBoxOrient: `vertical`,
    overflow: `hidden`,
    fontSize: 14,
    textDecoration: 'none',
    color: theme.color.textDark,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 4
  }
}));

export default styles;
