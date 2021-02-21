import { withStyles } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { ROUTES } from '../../Configures/routes';
import storeConfigure from './../../Redux/storeConfigure';
import styles from './styles';
import theme from './themes';
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
          {renderAdminRoutes()}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default withStyles(styles)(App);
