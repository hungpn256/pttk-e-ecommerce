import React, { Component } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import styles from './styles';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Favorite, FavoriteBorder, Visibility, VisibilityOff } from '@material-ui/icons';
import Footer from '../../Components/Footer';
import Logo from './../../Assets/logo.png';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionsAuthen from '../../Actions/authentication';
import CircularProgress from '@material-ui/core/CircularProgress';
import cn from 'classname';
class LoginPage extends Component {
  state = {
    password: '',
    email: '',
    showPassword: false,
    showLogin: false,
  };
  componentDidMount() {
    const { history, user } = this.props;
    const { hasUser } = user;
    if (hasUser) history.push('/');
  }
  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = this.state;
    const { actionsAuthen } = this.props;
    const { login } = actionsAuthen;
    login({ password, email });
  };
  render() {
    const { user, history } = this.props;
    const { isLoading, hasUser } = user;
    if (hasUser) {
      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
    const { password, showPassword, showLogin, email } = this.state;
    const { classes } = this.props;
    if (!showLogin) {
      return (
        <img
          style={{ display: 'none' }}
          src={'https://whitehat.org.uk/about-values.0b4bad06.svg'}
          alt=""
          className={classes.backgroundImage}
          onLoad={() => {
            this.setState({ showLogin: true });
          }}
        ></img>
      );
    }
    return (
      <>
        <div className={classes.headerLogin}>
          <div className={classes.logoWrapper}>
            <Link to={'/'}>
              <img className={classes.logoImage} src={Logo} alt=""></img>
            </Link>
            <span className={classes.logoText}>Go SHopp Đăng nhập</span>
          </div>
        </div>
        <div className={classes.background}>
          <img
            src={'https://whitehat.org.uk/about-values.0b4bad06.svg'}
            alt=""
            className={classes.backgroundImage}
          ></img>
          <div className={classes.login}>
            <Card style={{ background: 'transparent' }}>
              <CardContent>
                <form onSubmit={this.handleSubmit}>
                  <div className="text-xs-center pb-xs">
                    <Typography variant="caption">Đăng nhập để tiếp tục</Typography>
                  </div>
                  <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={this.handleChange('email')}
                    className={classes.textField}
                    fullWidth
                    margin="normal"
                  ></TextField>
                  <FormControl fullWidth className={classes.textField} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={this.handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControlLabel
                    className={classes.checkBox}
                    control={
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        name="checkedH"
                      />
                    }
                    label="Nhớ tài khoản"
                  />
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      style={{ width: '100%' }}
                      color="primary"
                      className={cn({
                        [classes.buttonSuccess]: hasUser,
                      })}
                      disabled={isLoading}
                      type="submit"
                    >
                      Login
                    </Button>
                    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                  <div className="pt-1 text-md-center">
                    <Link to="/signup">
                      <Button>Đăng ký tài khoản mới</Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    actionsAuthen: bindActionCreators(actionsAuthen, dispatch),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter
)(LoginPage);
