import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from '../../Configures/routes';
import axios from 'axios';
import styles from './styles';
import theme from './themes';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import * as actionsAuth from '../../Actions/authentication';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token ? `${token}` : '';
    console.log('getUser');
    dispatch(actionsAuth.getUser());
  }, []);
  const renderAdminRoutes = () => {
    return ROUTES.map((route, index) => {
      return (
        <ComponentsLayout
          component={route.component}
          layout={route?.layout}
          {...route}
          key={index}
        ></ComponentsLayout>
      );
    });
  };
  const ComponentsLayout = ({ component: Component, layout: Layout, ...props }) => {
    const history = useHistory();
    if (Layout) {
      return (
        <Route {...props}>
          <Layout history={history}>
            <Component></Component>
          </Layout>
          <MessengerCustomerChat pageId="105600471535776" appId="530387607688652" />
        </Route>
      );
    } else
      return (
        <Route {...props}>
          <Component />
        </Route>
      );
  };
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position="bottom-right" closeOnClick autoClose={2000} />
        {renderAdminRoutes()}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default withStyles(styles)(App);
