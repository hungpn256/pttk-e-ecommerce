import { Button, Card, IconButton, InputBase, Menu, MenuItem, Paper } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import SearchIcon from '@material-ui/icons/Search';
import cn from 'classname';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import IProduct from '../../Interfaces/product';
import LoadingGlobal from '../LoadingGlobal';
import * as actionsProduct from './../../Actions/product';
import * as actionsAuth from './../../Actions/authentication';
import Logo from './../../Assets/logo.png';
import ProductSearch from './../ProductSearch';
import styles from './styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import qs from 'query-string';
import product from '../../Reducers/product';
interface IHeader {
  listProductSearch: Array<IProduct>;
  isSearching: boolean;
}
const Header = ({ history }) => {
  const { listProductSearch, isSearching, paging }: IHeader = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);
  const product = useSelector((state) => state.product);
  const [keyword, setKeyword] = useState('');
  const { customer, isLoading } = auth;
  const dispatch = useDispatch();
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
    setKeyword(value);
    dispatch(searchProductName(value));
  };

  const enterSearch = () => {
    setKeyword('');
    dispatch(actionsProduct.changeStates({ paging: { ...paging, search: keyword } }));
    const searchPath = keyword.length ? qs.stringify({ search: keyword }) : '';
    history.push(`/products${searchPath.length ? `?${searchPath}` : ``}`);
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    setAnchorEl(null);
    dispatch(actionsAuth.logOut());
  };
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
            <li
              className={cn(classes.item, classes.hasLineRight)}
              style={{ display: !customer ? 'block' : 'none' }}
            >
              <Link
                onClick={() => {
                  dispatch(actionsAuth.changeStates({ prePath: history.location.pathname }));
                }}
                className={classes.itemLink}
                to="/login"
              >
                Đăng nhập
              </Link>
            </li>
            <li className={classes.item} style={{ display: !customer ? 'block' : 'none' }}>
              <Link
                onClick={() => {
                  dispatch(actionsAuth.changeStates({ prePath: history.location.pathname }));
                }}
                className={classes.itemLink}
                to="/signup"
              >
                Đăng ký
              </Link>
            </li>
            <li
              className={cn(classes.item)}
              style={{ display: customer ? 'flex' : 'none', padding: 0, alignItems: 'flex-start' }}
            >
              <Link className={classes.itemLink} to="/heh">
                <AccountCircleIcon
                  className={classes.icon}
                  style={{ fontSize: 25, padding: 0, margin: '0 2px' }}
                />
                <span>{customer && customer?.fullName?.firstName}</span>
              </Link>
              <ArrowDropDownIcon
                className={classes.icon}
                style={{ fontSize: 25, padding: 0, paddingTop: 5 }}
                onClick={handleClick}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </Menu>
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
                value={keyword}
                onFocus={() => {
                  setDisplay('block');
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setDisplay('none');
                  }, 300);
                }}
                onChange={handleChange}
              />
              <IconButton onClick={enterSearch} aria-label="search">
                <SearchIcon />
              </IconButton>
              <div style={{ display: display }} className={classes.listProductSearch}>
                {isSearching ? (
                  <div
                    style={{
                      width: '100%',
                      height: '150px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <LoadingGlobal />
                  </div>
                ) : (
                  <>
                    <Card className={classes.cardSearch}>
                      {listProductSearch.map((product, index) => {
                        return <ProductSearch product={product} />;
                      })}
                    </Card>
                    {listProductSearch.length > 6 && (
                      <div className={classes.showAll}>Xem thêm &gt;&gt;&gt;&gt;</div>
                    )}
                  </>
                )}
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

export default Header;
