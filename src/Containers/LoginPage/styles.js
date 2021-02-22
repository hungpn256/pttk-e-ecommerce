const styles = (theme) => ({
  background: {
    background: theme.color.background,
    position: 'relative',
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    textAlign: 'center',
    flex: '1 0 auto',
    overflow: 'hidden',
  },
  textField: {},
  backgroundImage: {
    position: 'absolute',
    width: 3000,
    transform: 'translateX(300px)',
    overflowX: 'hidden',
  },
  login: {
    width: 400,
    background: 'rgba(255,255,255,0.9)',
    zIndex: 1,
  },
  headerLogin: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  logoImage: {
    width: 100,
  },
  logoText: {
    fontSize: 30,
    fontWeight: 500,
    color: '#393E44',
    background: 'transparent',
    marginLeft: 15,
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  checkBox: {
    width: '100%',
    textAlign: 'start',
    fontSize: 10,
  },
});
export default styles;
