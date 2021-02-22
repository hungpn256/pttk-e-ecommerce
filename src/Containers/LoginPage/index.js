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
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder, Visibility, VisibilityOff } from '@material-ui/icons';
import Footer from '../../Components/Footer';
import Logo from './../../Assets/logo.png';
class LoginPage extends Component {
  state = {
    password: '',
    showPassword: false,
    showLogin: false,
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
    console.log(a.target[0]);
  };
  render() {
    const { password, showPassword, showLogin } = this.state;
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
                <form onSubmit={this.hung}>
                  <div className="text-xs-center pb-xs">
                    <Typography variant="caption">Đăng nhập để tiếp tục</Typography>
                  </div>
                  <TextField
                    id="email"
                    label="Email"
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
                  <Button variant="contained" color="primary" fullWidth type="submit">
                    Login
                  </Button>
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

export default withStyles(styles)(LoginPage);
