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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Favorite, FavoriteBorder, Visibility, VisibilityOff } from '@material-ui/icons';
import cn from 'classname';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import * as actionsAuthen from '../../Actions/authentication';
import Footer from '../../Components/Footer';
import Logo from './../../Assets/logo.png';
import styles from './styles';
class LoginPage extends Component {
  state = {
    password: '',
    email: '',
    showPassword: false,
    showLogin: false,
  };
  componentDidMount() {
    const { history, auth } = this.props;
    const { user, loginSuccess } = auth;
    if (loginSuccess) window.location.reload();
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
    const { auth, history } = this.props;
    const { isLoading, hasUser, user, loginSuccess, prePath } = auth;
    // if (loginSuccess) {
    //   history.push('/');
    // }
    console.log(history.location);
    if (user) {
      history.push(prePath);
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
              <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />
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
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
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
