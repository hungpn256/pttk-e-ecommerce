import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Main from './components/main'
import { Route } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import AdminBook from './components/Book';
import { fetchProductList } from '../../Actions/product';
import { Helmet } from "react-helmet";
export default function Admin() {

  const customer = useSelector((state) => state.auth.customer);
  return (

    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin</title>
        <meta name="description" content="Helmet application" />
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
        <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css" />
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
        <link rel="stylesheet" href="plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css" />
        <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css" />
        <link rel="stylesheet" href="plugins/jqvmap/jqvmap.min.css" />
        <link rel="stylesheet" href="dist/css/adminlte.min.css" />
        <link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css" />
        <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css" />
        <link rel="stylesheet" href="plugins/summernote/summernote-bs4.min.css" />
      </Helmet>
      <div className="wrapper">

        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="index3.html" className="nav-link">Home</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <a href="#" className="nav-link">Contact</a>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                <i className="fas fa-search"></i>
              </a>
              <div className="navbar-search-block">
                <form className="form-inline">
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search"></i>
                      </button>
                      <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-comments"></i>
                <span className="badge badge-danger navbar-badge">3</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <a href="#" className="dropdown-item">
                  <div className="media">
                    <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Brad Diesel
                        <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                      </h3>
                      <p className="text-sm">Call me whenever you can...</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <div className="media">
                    <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        John Pierce
                        <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                      </h3>
                      <p className="text-sm">I got your message bro</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <div className="media">
                    <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                    <div className="media-body">
                      <h3 className="dropdown-item-title">
                        Nora Silvester
                        <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                      </h3>
                      <p className="text-sm">The subject goes here</p>
                      <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                    </div>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-bell"></i>
                <span className="badge badge-warning navbar-badge">15</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">15 Notifications</span>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-envelope mr-2"></i> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-users mr-2"></i> 8 friend requests
                  <span className="float-right text-muted text-sm">12 hours</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item">
                  <i className="fas fa-file mr-2"></i> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                <i className="fas fa-expand-arrows-alt"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                <i className="fas fa-th-large"></i>
              </a>
            </li>
          </ul>
        </nav>

        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <a href="index3.html" className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: 0.8 }} />
            <span className="brand-text font-weight-light">Admin</span>
          </a>

          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
              </div>
              <div className="info">
                <a href="#" className="d-block">{customer?.fullName?.firstName ?? ""}</a>
              </div>
            </div>

            <div className="form-inline">
              <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                  <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw"></i>
                  </button>
                </div>
              </div>
            </div>

            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item ">
                  <Link to="/admin" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt"></i>
                    <p>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="pages/widgets.html" className="nav-link">
                    <i className="nav-icon fas fa-th"></i>
                    <p>
                      Widgets
                      <span className="right badge badge-danger">New</span>
                    </p>
                  </Link>
                </li>

                <li className="nav-header">Sản phẩm</li>
                <li className="nav-item">
                  <Link to="/admin/book" className="nav-link">
                    <i className="nav-icon fas fa-book"></i>
                    <p>
                      Sách
                      <span className="badge badge-info right">2</span>
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/electronic" className="nav-link">
                    <i className="nav-icon fas fa-laptop-code"></i>
                    <p>
                      Đồ điện tử
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/shoes" className="nav-link">
                    <i className="nav-icon fas fa-shoe-prints"></i>
                    <p>
                      Giày
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/clothes" className="nav-link">
                    <i className="nav-icon fas fa-tshirt"></i>
                    <p>
                      Quần áo
                    </p>
                  </Link>
                </li>
                <li className="nav-header">Quản lý cửa hàng</li>
                <li className="nav-item">
                  <Link to="/admin/order" className="nav-link">
                    <i className="nav-icon far fa-calendar-alt"></i>
                    <p>
                      Các đơn hàng
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/employee" className="nav-link">
                    <i className="nav-icon far fa-calendar-alt"></i>
                    <p>
                      Nhân viên
                    </p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
        <div style={{ height: 'calc(100vh - 57px)', overflowY: 'auto' }}>
          <Route path="/admin" exact={true}>
            <Main />
          </Route>
          <Route path="/admin/book" exact={true}>
            <AdminBook />
          </Route>
        </div>
        <aside className="control-sidebar control-sidebar-dark">
        </aside>
      </div>
    </div>
  )
}
