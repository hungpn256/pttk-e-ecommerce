import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import Footer from '../../Components/Footer';
import Logo from './../../Assets/logo.png';
import styles from './styles';
import * as actionsAuthen from '../../Actions/authentication';
import cn from 'classname';
class SignUp extends Component {
  state = {
    phoneNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    showPassword: false,
    showLogin: false,
    cPassword: '',
  };
  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  hung = (a, b) => {
    a.preventDefault();
    const { actionsAuthen } = this.props;
    const { signup } = actionsAuthen;
    const { firstName, lastName, username, cPassword, email, password, phoneNumber } = this.state;
    if (cPassword === password) {
      signup({ name: { firstName, lastName }, username, email, password, phoneNumber });
    }
  };
  render() {
    const { password, showPassword, showLogin, cPassword } = this.state;
    const { classes, user } = this.props;
    const { isLoading, hasUser } = user;
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
            <span className={classes.logoText}>Go SHopp Đăng ký</span>
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
                <form onSubmit={this.hung} id="signup">
                  <div className="text-xs-center pb-xs">
                    <Typography variant="caption">Đăng ký tài khoản</Typography>
                  </div>
                  <div className={classes.fullName}>
                    <TextField
                      id="firstName"
                      label="First name"
                      className={classes.textField}
                      onChange={this.handleChange('firstName')}
                      style={{ width: '45%' }}
                      margin="normal"
                    ></TextField>
                    <TextField
                      id="lastName"
                      label="Last name"
                      className={classes.textField}
                      onChange={this.handleChange('lastName')}
                      style={{ width: '45%' }}
                      margin="normal"
                    ></TextField>
                  </div>
                  <TextField
                    id="username"
                    label="User name"
                    className={classes.textField}
                    onChange={this.handleChange('username')}
                    fullWidth
                    margin="normal"
                  ></TextField>
                  <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    onChange={this.handleChange('email')}
                    fullWidth
                    margin="normal"
                  ></TextField>
                  <TextField
                    id="phoneNumber"
                    label="Phone number"
                    className={classes.textField}
                    onChange={this.handleChange('phoneNumber')}
                    fullWidth
                    margin="normal"
                  ></TextField>
                  <FormControl
                    fullWidth
                    className={classes.textField}
                    style={{ marginBottom: 10, paddingBottom: 14, paddingTop: 15 }}
                  >
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
                  <FormControl fullWidth className={classes.textField} style={{ marginBottom: 10 }}>
                    <InputLabel htmlFor="standard-adornment-password">Enter password</InputLabel>
                    <Input
                      id="standard-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={cPassword}
                      onChange={this.handleChange('cPassword')}
                    />
                  </FormControl>
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
export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SignUp);
