import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Favorite,
  FavoriteBorder,
  TransferWithinAStationSharp,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import cn from 'classname';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import * as actionsAuthen from '../../Actions/authentication';
import styles from './styles';
import * as _ from 'lodash';
import * as H from '../../Helper/Validate';
class LoginPage extends Component {
  state = {
    password: '',
    email: '',
    showPassword: false,
    showLogin: false,
    passwordHelper: '',
    emailHelper: '',
  };
  componentDidMount() {
    const { history, auth } = this.props;
    const { user, loginSuccess } = auth;
    if (loginSuccess) window.location.reload();
  }
  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value, [prop + 'Helper']: '' });
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
    let check = true;
    if (H.isEmpty.check(email)) {
      this.setState({ emailHelper: H.isEmpty.messenger });
      check = false;
    } else {
      if (!H.email.check(email)) {
        this.setState({ emailHelper: H.email.messenger });
        check = false;
      }
    }
    if (H.isEmpty.check(password)) {
      this.setState({ passwordHelper: H.isEmpty.messenger });
      check = false;
    } else {
      if (H.min6.check(password)) {
        this.setState({ passwordHelper: H.min6.messenger });
        check = false;
      }
    }
    if (check) login({ password, email });
  };
  render() {
    const { auth, history } = this.props;
    const { isLoading, hasUser, user, prePath } = auth;
    if (user) {
      history.push(prePath);
    }
    const { password, showPassword, showLogin, email, passwordHelper, emailHelper } = this.state;
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
        <form onSubmit={this.handleSubmit} autoComplete={false}>
          <div className="text-xs-center pb-xs">
            <Typography variant="caption">Đăng nhập để tiếp tục</Typography>
          </div>
          <TextField
            variant="outlined"
            helperText={<span style={{ color: 'red', position: 'absolute' }}>{emailHelper}</span>}
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={this.handleChange('email')}
            className={classes.textField}
            fullWidth
            margin="normal"
          ></TextField>
          <div style={{ position: 'relative' }}>
            <TextField
              variant="outlined"
              name="password"
              helperText={
                <span style={{ color: 'red', position: 'absolute' }}>{passwordHelper}</span>
              }
              label="Password"
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={this.handleChange('password')}
              className={classes.textField}
              fullWidth
              margin="normal"
            ></TextField>
            <IconButton
              style={{ position: 'absolute', bottom: '15px', right: 0 }}
              aria-label="toggle password visibility"
              // onClick={this.handleClickShowPassword}
              onMouseDown={() => {
                this.setState({ showPassword: !this.state.showPassword });
              }}
              onMouseUp={() => {
                this.setState({ showPassword: !this.state.showPassword });
              }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>
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
