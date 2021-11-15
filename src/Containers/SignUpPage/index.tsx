import {
  Button, CircularProgress, IconButton, TextField,
  Typography,
  withStyles
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import cn from 'classname';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import * as actionsAuthen from '../../Actions/authentication';
import { Customer } from '../../models/customer';
import styles from './styles';
class SignUp extends Component {
  state = {
    mobile: '',
    password: '',
    firstName: '',
    midName: '',
    lastName: '',
    username: '',
    cPassword: '',
    email: '',
    mobileHelper: '',
    passwordHelper: '',
    firstNameHelper: '',
    lastNameHelper: '',
    usernameHelper: '',
    emailHelper: '',
    number: 0,
    street: '',
    district: '',
    city: '',
    showPassword: false,
    showLogin: false,
  };
  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  // handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  handleSignUp = (e, b) => {
    e.preventDefault();
    const { actionsAuthen } = this.props;
    const { signup } = actionsAuthen;
    const {
      firstName,
      midName,
      lastName,
      username,
      cPassword,
      email,
      password,
      mobile,
      number,
      street,
      district,
      city,
    } = this.state;
    let customer: Customer = {
      fullName: {
        firstName,
        midName,
        lastName,
      },
      account: {
        username,
        password,
      },
      email,
      mobile,
      address: {
        number,
        street,
        district,
        city,
      },
    }; signup(customer);

  };

  render() {
    const {
      password,
      showPassword,
      showLogin,
      cPassword,
      passwordHelper,
      firstNameHelper,
      lastNameHelper,
      emailHelper,
      mobileHelper,
      usernameHelper,
    } = this.state;
    const { classes, auth } = this.props;
    const { isLoading, hasUser } = auth;
    return (
      <>
        <form onSubmit={this.handleSignUp} id="signup">
          <div className="text-xs-center pb-xs">
            <Typography variant="caption">Đăng ký tài khoản</Typography>
          </div>
          <TextField
            id="firstName"
            helperText={
              <span style={{ color: 'red', position: 'absolute' }}>{firstNameHelper}</span>
            }
            label="First name"
            variant="outlined"
            className={classes.textField}
            onChange={this.handleChange('firstName')}
            margin="normal"
            fullWidth
          ></TextField>
          <div className={classes.fullName}>
            <TextField
              id="firstName"
              helperText={
                <span style={{ color: 'red', position: 'absolute' }}>{firstNameHelper}</span>
              }
              label="Middle name"
              variant="outlined"
              className={classes.textField}
              onChange={this.handleChange('midName')}
              style={{ width: '45%' }}
              margin="normal"
            ></TextField>
            <TextField
              id="lastName"
              helperText={
                <span style={{ color: 'red', position: 'absolute' }}>{lastNameHelper}</span>
              }
              label="Last name"
              variant="outlined"
              className={classes.textField}
              onChange={this.handleChange('lastName')}
              style={{ width: '45%' }}
              margin="normal"
            ></TextField>
          </div>
          <TextField
            id="username"
            helperText={
              <span style={{ color: 'red', position: 'absolute' }}>{usernameHelper}</span>
            }
            variant="outlined"
            label="User name"
            className={classes.textField}
            onChange={this.handleChange('username')}
            fullWidth
            margin="normal"
          ></TextField>
          <TextField
            id="email"
            helperText={<span style={{ color: 'red', position: 'absolute' }}>{emailHelper}</span>}
            variant="outlined"
            label="Email"
            className={classes.textField}
            onChange={this.handleChange('email')}
            fullWidth
            margin="normal"
          ></TextField>
          <TextField
            id="mobile"
            helperText={<span style={{ color: 'red', position: 'absolute' }}>{mobileHelper}</span>}
            variant="outlined"
            label="Phone number"
            className={classes.textField}
            onChange={this.handleChange('mobile')}
            fullWidth
            margin="normal"
          ></TextField>
          <div className={classes.fullName}>
            <TextField
              id="number"
              helperText={
                <span style={{ color: 'red', position: 'absolute' }}>{firstNameHelper}</span>
              }
              label="number"
              variant="outlined"
              className={classes.textField}
              onChange={this.handleChange('number')}
              style={{ width: '45%' }}
              margin="normal"
            ></TextField>
            <TextField
              id="street"
              helperText={
                <span style={{ color: 'red', position: 'absolute' }}>{lastNameHelper}</span>
              }
              label="Street"
              variant="outlined"
              className={classes.textField}
              onChange={this.handleChange('street')}
              style={{ width: '45%' }}
              margin="normal"
            ></TextField>
          </div>
          <div className={classes.fullName}>
            <TextField
              id="district"
              helperText={
                <span style={{ color: 'red', position: 'absolute' }}>{firstNameHelper}</span>
              }
              label="District"
              variant="outlined"
              className={classes.textField}
              onChange={this.handleChange('district')}
              style={{ width: '45%' }}
              margin="normal"
            ></TextField>
            <TextField
              id="city"
              helperText={
                <span style={{ color: 'red', position: 'absolute' }}>{lastNameHelper}</span>
              }
              label="City"
              variant="outlined"
              className={classes.textField}
              onChange={this.handleChange('city')}
              style={{ width: '45%' }}
              margin="normal"
            ></TextField>
          </div>

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

          <TextField
            variant="outlined"
            name="cpassword"
            label="Enter Password"
            id="enter-password"
            type={showPassword ? 'text' : 'password'}
            value={cPassword}
            onChange={this.handleChange('cPassword')}
            className={classes.textField}
            fullWidth
            margin="normal"
          ></TextField>

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
              Sign up
            </Button>
            {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
          <div className="pt-1 text-md-center">
            <Link to="/login">
              <Button>Đã có tài khoản</Button>
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
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignUp);
