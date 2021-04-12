import { Card, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Logo from './../../Assets/logo.png';
import styles from './styles';
import backgroundAuth from '../../Assets/background.jpg';
class AuthLayout extends Component {
  state = {
    showLogin: false,
  };
  render() {
    const { children, classes } = this.props;
    const { showLogin } = this.state;
    if (!showLogin) {
      return (
        <img
          style={{ display: 'none' }}
          src={backgroundAuth}
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
            <span className={classes.logoText}>Go SHopp</span>
          </div>
        </div>
        <div className={classes.background}>
          <img src={backgroundAuth} alt="" className={classes.backgroundImage}></img>
          <div className={classes.login}>
            <Card style={{ background: 'transparent' }}>
              <CardContent>{children}</CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default withStyles(styles)(AuthLayout);
