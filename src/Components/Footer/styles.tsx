import { makeStyles } from '@material-ui/core/styles';
const styles = makeStyles((theme) => ({
  footerMain: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '40px 0',
  },
  columnFooter: {},
  titleColumn: {
    textTransform: 'uppercase',
    color: '#707070',
    fontSize: 14,
    margin: '15px 0',
  },
  columnList: {},
  columnItem: {
    fontSize: 12,
    color: '#707070',
  },
  imageItem: {
    width: 90,
    margin: '3px 0',
  },
  info: {
    margin: '10px 0',
    color: '#707070',
    fontSize: 12,
    textAlign: 'center',
  },
}));
export default styles;
