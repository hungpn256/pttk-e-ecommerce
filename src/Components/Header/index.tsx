import { Button, Card, IconButton, InputBase, Paper } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import SearchIcon from '@material-ui/icons/Search';
import cn from 'classname';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import IProduct from '../../Interfaces/product';
import * as actionsProduct from './../../Actions/product';
import Logo from './../../Assets/logo.png';
import ProductSearch from './../ProductSearch';
import styles from './styles';
interface IHeader {
  actionsProduct: {};
  listProductSearch: Array<IProduct>;
  isSearching: boolean;
}
const Header = ({ actionsProduct, listProductSearch, isSearching }: IHeader) => {
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

  const handleChange = (e) => {
    const { searchProductName } = actionsProduct;
    const { value } = e.target;
    if (value.length > 0) searchProductName(value);
  };

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);
  const [display, setDisplay] = useState('none');
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
            <Link to="/">
              <img className={classes.logo} src={Logo} alt="" />
            </Link>
          </div>
          <div className={classes.searchNav}>
            <Paper component="form" className={classes.searchForm}>
              <InputBase
                className={classes.input}
                placeholder="Search product"
                onFocus={() => {
                  setDisplay('block');
                }}
                onBlur={() => {
                  setDisplay('none');
                }}
                onChange={handleChange}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
              <div style={{ display: display }} className={classes.listProductSearch}>
                <Card className={classes.cardSearch}>
                  {listProductSearch.map((product, index) => {
                    return <ProductSearch product={product} />;
                  })}
                </Card>
                {listProductSearch.length > 6 && <div className={classes.showAll}>xem tiếp</div>}
              </div>
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
const mapDispatchToProps = (dispatch, actions) => {
  return {
    actionsProduct: bindActionCreators(actionsProduct, dispatch),
  };
};
const mapStateToProps = (state) => ({
  listProductSearch: state.product.listProductSearch,
  isSearching: state.product.isSearching,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
