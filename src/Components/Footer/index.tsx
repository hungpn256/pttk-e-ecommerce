import React from 'react';
import styles from './styles';
import cn from 'classname';
import { Divider } from '@material-ui/core';
const Footer = () => {
  const classes = styles();
  return (
    <div style={{ background: '#FBFBFB' }}>
      <Divider />
      <div className="container">
        <div className={cn(classes.footerMain)}>
          <div className={classes.columnFooter}>
            <h4 className={classes.titleColumn}>Chăm sóc khách hàng</h4>
            <ul className={classes.columnList}>
              <li className={classes.columnItem}>Trung Tâm Trợ Giúp</li>
              <li className={classes.columnItem}> Shopee Blog</li>
              <li className={classes.columnItem}>Shopee Mall</li>
              <li className={classes.columnItem}>Hướng Dẫn Mua Hàng</li>
              <li className={classes.columnItem}>Hướng Dẫn Bán Hàng</li>
              <li className={classes.columnItem}>Thanh Toán</li>
              <li className={classes.columnItem}>Go xu</li>
              <li className={classes.columnItem}>Vận Chuyển</li>
            </ul>
          </div>
          <div className={classes.columnFooter}>
            <h4 className={classes.titleColumn}>Về Go SHopp</h4>
            <ul className={classes.columnList}>
              <li className={classes.columnItem}>Giới Thiệu Về Shopee Việt Nam</li>
              <li className={classes.columnItem}> Tuyển dụng</li>
              <li className={classes.columnItem}>Điều khoản</li>
              <li className={classes.columnItem}>Chính sách bảo mật</li>
              <li className={classes.columnItem}>Chính Hãng</li>
              <li className={classes.columnItem}>Kênh Người Bán</li>
            </ul>
          </div>
          <div className={classes.columnFooter}>
            <h4 className={classes.titleColumn}>Theo dõi tôi trên</h4>
            <ul className={classes.columnList}>
              <li className={classes.columnItem}>Facebook</li>
              <li className={classes.columnItem}> Instagram</li>
            </ul>
          </div>
          <div className={classes.columnFooter}>
            <h4 className={classes.titleColumn}>TẢI ỨNG DỤNG Go SHopp NGAY THÔI</h4>
            <ul className={classes.columnList}>
              <li className={classes.columnItem}>
                <img
                  className={classes.imageItem}
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/0038709cb8b3ebaa41b12fe247e6baaa.png"
                  alt="App Store"
                />
              </li>
              <li className={classes.columnItem}>
                <img
                  className={classes.imageItem}
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/438a3b355756fe8de8b2338c3e96411e.png"
                  alt="Play Store"
                />
              </li>
              <li className={classes.columnItem}>
                <img
                  className={classes.imageItem}
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/8ae33bfad74818a3dc2dee819c9a4d06.png"
                  alt="App Gallery"
                />
              </li>
            </ul>
          </div>
        </div>
        <Divider />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
            color: '#707070',
          }}
        >
          <span>© 2021 Shopee. Tất cả các quyền được bảo lưu.</span>
          <span>
            Quốc gia & Khu vực: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam |
            Philippines | Brazil
          </span>
        </div>
        <div className={classes.info}>
          <div>
            <img
              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9309ced7a31ba301cc093d26a5461313.png"
              alt=""
            />
          </div>
          <p style={{ margin: '10px 0' }}>Công ty TNHH Shopee</p>
          <p>
            Địa chỉ: Tầng 28, Tòa nhà trung tâm Lotte Hà Nội, 54 Liễu Giai, phường Cống Vị, Quận Ba
            Đình, Hà Nội. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </p>
          <p>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày
            10/02/2015
          </p>
          <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
