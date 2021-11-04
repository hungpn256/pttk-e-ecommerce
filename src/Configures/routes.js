import NotFound from '../Components/NotFound';
import Home from '../Containers/Home';
import LoginPage from '../Containers/LoginPage';
import ProductDetail from '../Containers/ProductDetail';
import ProductTypePage from '../Containers/ProductHasCond';
import SignUpPage from '../Containers/SignUpPage';
import testComponent from '../Containers/testComponent';
import LayoutIncludeHeader from '../Layout/IncludeHeader';
import AuthLayout from '../Layout/Authentication';
import Cart from '../Containers/Cart';
import Order from '../Containers/Order';
export const ROUTES = [
  {
    path: '/',
    name: 'Trang chủ',
    layout: LayoutIncludeHeader,
    exact: true,
    component: Home,
  },
  {
    path: '/product/detail/:_id',
    name: 'Chi tiết sản phẩm',
    exact: true,
    layout: LayoutIncludeHeader,
    component: ProductDetail,
  },
  {
    path: '/products',
    name: 'Loại Sản phẩm',
    exact: false,
    layout: LayoutIncludeHeader,
    component: ProductTypePage,
  },
  {
    path: '/cart',
    name: 'Loại Sản phẩm',
    exact: false,
    layout: LayoutIncludeHeader,
    component: Cart,
  },
  {
    path: '/order',
    name: 'Loại Sản phẩm',
    exact: false,
    layout: LayoutIncludeHeader,
    component: Order,
  },
  {
    path: '/login',
    name: 'Đăng nhập',
    exact: true,
    layout: AuthLayout,
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'Đăng Ký',
    exact: true,
    layout: AuthLayout,
    component: SignUpPage,
  },
  {
    path: '/test',
    name: 'test',
    exact: true,
    component: testComponent,
  },

  // {
  //   path: '/',
  //   exact: false,
  //   name: 'Không tìm thấy',
  //   component: NotFound,
  // },
];
