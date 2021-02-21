import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  product: {
    position: 'relative',
    maxWidth: 190,
    margin: 5,
    height: 285,
    '&:hover': {
      border: `2px solid ${theme.color.background}`,
      translateY: -5,
    },
  },
  media: {
    height: 190,
    paddingTop: '56.25%', // 16:9
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
}));

export default styles;
