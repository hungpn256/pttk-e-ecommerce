import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import cn from 'classname';
import { Link } from 'react-router-dom';
import { Button, IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Logo from './../../Assets/logo.png';
const Header = () => {
  const [y, setY] = useState(window.scrollY);
  const [stylesNav, setStylesNav] = useState({
    top: 0,
    position: 'sticky',
  });
  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        if (stylesNav.top === -120) {
          setStylesNav({
            top: 0,
            position: 'sticky',
          });
        }
      } else if (y < window.scrollY) {
        if (stylesNav.top === 0) {
          setStylesNav({
            top: -120,
            position: 'fixed',
          });
        }
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);
  const classes = styles();
  return (
    <div
      className={classes.header}
      style={{ top: stylesNav.top, position: stylesNav.position }}
      id="header"
    >
      <div className={cn('container')}>
        <div className={classes.navTop}>
          <ul className={classes.listItem}>
            <li className={cn(classes.item, classes.hasLineRight)}>Xin chào đến với Shop H</li>
            <li className={classes.item}>
              Kết nối{' '}
              <a className={classes.itemLink} href="https://www.facebook.com/Kendz256/">
                <FacebookIcon className={classes.icon} />
              </a>
              <a className={classes.itemLink} href="https://www.instagram.com/super_cheo__256/">
                <InstagramIcon className={classes.icon} />
              </a>
            </li>
            <li style={{ marginLeft: 0 }} className={classes.item}></li>
          </ul>
          <ul className={classes.listItem}>
            <li className={classes.item}>
              <NotificationsActiveIcon className={classes.icon} />
              Thông báo
            </li>
            <li className={classes.item}>
              <LiveHelpIcon className={classes.icon} />
              Trợ giúp
            </li>
            <li className={cn(classes.item, classes.hasLineRight)}>
              <Link className={classes.itemLink} to="/login">
                Đăng nhập
              </Link>
            </li>
            <li className={classes.item}>
              <Link className={classes.itemLink} to="/signup">
                Đăng ký
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.navBottom}>
          <div className={classes.wrapperLogo}>
            <img className={classes.logo} src={Logo} alt="" />
          </div>
          <div className={classes.searchNav}>
            <Paper component="form" className={classes.searchForm}>
              <InputBase className={classes.input} placeholder="Search product" />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
          <div className={classes.AddShoppingCart}>
            <Button>
              <AddShoppingCartIcon className={classes.AddShoppingCartIcon} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
