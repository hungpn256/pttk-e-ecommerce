import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROUTES } from '../../Configures/routes';
import storeConfigure from './../../Redux/storeConfigure';
import styles from './styles';
import theme from './themes';
import MessengerCustomerChat from 'react-messenger-customer-chat';
const store = storeConfigure();
function App() {
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
    if (Layout) {
      return (
        <Route {...props}>
          <Layout>
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
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer position="bottom-right" closeOnClick autoClose={2000} />
          {renderAdminRoutes()}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default withStyles(styles)(App);
