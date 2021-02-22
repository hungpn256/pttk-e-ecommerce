import { makeStyles } from '@material-ui/core/styles';
const styles = makeStyles((theme) => ({
  header: {
    minWidth: 1200,
    height: 120,
    width: '100%',
    background: theme.color.background_linear_gradient,
    color: theme.color.textLight,
    fontFamily: 'Roboto',
    position: 'sticky',
    MozPosition: 'sticky',
    MozStickyPosition: 'sticky',
    top: 0,
    zIndex: 10,
    transition: 'top 0.5s',
  },
  navTop: { display: 'flex', justifyContent: 'space-between' },
  listItem: {
    display: 'flex',
    listStyle: 'none',
    fontSize: 15,
  },
  icon: {
    cursor: 'pointer',
    fontSize: 18,
    position: 'relative',
    top: 4,
  },
  item: {
    padding: 8,
    paddingTop: 0,
    lineHeight: '34px',
  },
  itemLink: { textDecoration: 'none', color: theme.color.textLight },
  hasLineRight: {
    '&::after': {
      content: '""',
      display: 'block-inline',
      position: 'relative',
      borderRight: '1px solid #fff',
      opacity: 0.4,
      height: '14px',
      top: 0,
      right: -8,
      transform: 'translateY(-50%)',
    },
  },
  wrapperLogo: {
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 65,
    opacity: 0.8,
    outlineWidth: 20,
    // border: '4px solid blue',
    // borderRadius: '50%',
  },
  navBottom: { display: 'flex', justifyContent: 'space-around' },
  searchNav: {
    position: 'relative',
    width: '70%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    padding: 0,
  },
  searchForm: {
    marginTop: theme.spacing(3),
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '40px',
  },
  AddShoppingCart: {
    color: theme.color.textLight,
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddShoppingCartIcon: {
    fontSize: 40,
    color: theme.color.textLight,
  },
  listProductSearch: {
    position: 'absolute',
    width: '93%',
    backgroundColor: '#f3f3f3',
    zIndex: 999,
    top: '85%',
    left: 0,
    borderRadius: 5,
    transition: 'opacity 1s ease-out',
    maxHeight: 600,
  },
  cardSearch: {
    maxHeight: 570,
    overflow: 'auto',
  },
  showAll: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
export default styles;
