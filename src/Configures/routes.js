import NotFound from '../Components/NotFound';
import Home from '../Containers/Home';
import LoginPage from '../Containers/LoginPage';
import ProductDetail from '../Containers/ProductDetail';
import ProductTypePage from '../Containers/ProductHasCond';
import SignUpPage from '../Containers/SignUpPage';
import testComponent from '../Containers/testComponent';
import LayoutIncludeHeader from '../Layout/IncludeHeader';
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
    path: '/login',
    name: 'Đăng nhập',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/signup',
    name: 'Đăng Ký',
    exact: true,
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
