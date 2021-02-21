import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  title: {
    color: 'rgba(0,0,0,0.7)',
    textTransform: 'uppercase',
    '& span': {
      fontSize: 18,
    },
  },
  productTypeList: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 400,
    flexWrap: 'wrap',
    overflowX: 'scroll',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar-track': {
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      backgroundColor: '#F5F5F5',
      borderRadius: 10,
    },

    '&::-webkit-scrollbar': {
      width: 5,
      height: 4,
      backgroundColor: '#F5F5F5',
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: 10,
      backgroundImage: `-webkit-gradient(linear,left bottom,left top,
									   color-stop(0.44, rgb(122,153,217)),
									   color-stop(0.72, rgb(73,125,189)),
									   color-stop(0.86, rgb(28,58,148)))`,
    },
  },
}));

export default styles;
