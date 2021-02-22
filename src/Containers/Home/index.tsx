import { Divider } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import cn from 'classname';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CarouselComponent from '../../Components/Carousel';
import Header from '../../Components/Header';
import ProductList from '../../Components/ProductList';
import { IProductType } from '../../Components/ProductType';
import ProductTypeList from '../../Components/ProductTypeList';
import IProduct from '../../Interfaces/product';
import LoginPage from '../LoginPage';
import * as producActions from './../../Actions/product';
import styles from './styles';
interface IHome {
  producActions: {
    fetchProductList: ({
      page,
      limit,
      cond,
    }: {
      page: number;
      limit: number;
      cond: any;
    }) => { type: string; payload: object };
    fetchProductListType: () => { type: string; payload: object };
  };
  listProduct: Array<IProduct>;
  listProductType: Array<IProductType> | Array<object>;
  total: number;
  isLoadingProduct: boolean;
  isLoadingType: boolean;
}
const Home = ({
  producActions,
  listProduct,
  listProductType,
  total,
  isLoadingProduct,
  isLoadingType,
}: IHome) => {
  const classes = styles();

  const [paging, setPaging] = React.useState({
    page: 1,
    limit: 24,
    cond: {},
  });
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaging({ ...paging, page: value });
  };
  useEffect(() => {
    const { fetchProductListType } = producActions;
    fetchProductListType();
  }, []);
  useEffect(() => {
    const { fetchProductList, changeStates } = producActions;
    fetchProductList(paging);
    return () => {
      changeStates({ listProduct: [] });
    };
  }, [paging]);
  const listProductCurrent = isLoadingProduct ? Array(24).fill({}) : listProduct;
  debugger;
  const listImage = [
    { image: 'https://cf.shopee.vn/file/a58eb76fc3d22916cd6948fd4dc50e08_xxhdpi' },
    { image: 'https://cf.shopee.vn/file/a58eb76fc3d22916cd6948fd4dc50e08_xxhdpi' },
    { image: 'https://cf.shopee.vn/file/be351e907b0f3a39a14c1c4a6c63b2e6_xxhdpi' },
    { image: 'https://cf.shopee.vn/file/be351e907b0f3a39a14c1c4a6c63b2e6_xxhdpi' },
  ];
  return (
    <div className={classes.home}>
      <div className={cn('container', classes.content)}>
        <div className={classes.advertisement}>
          <div className={classes.carousel}>
            <CarouselComponent options={{ stopAutoPlayOnHover: false }} listImage={listImage} />
          </div>

          <div className={classes.imageAdvertisement}>
            <img
              style={{ width: '100%', height: '100%' }}
              src="https://salt.tikicdn.com/cache/w408/ts/banner/aa/3b/b3/403c766e847f8a4509ad21f6cadcb6bb.jpg"
              alt=""
            />
          </div>
        </div>
        <div className={classes.listProductType}>
          <ProductTypeList
            lineNumber={2}
            listProductType={!isLoadingType ? listProductType : Array(20).fill({})}
          />
        </div>
        <div className={classes.listProduct}>
          <ProductList
            onChangePage={handleChangePage}
            paging={paging}
            listProduct={listProductCurrent}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    listProduct: state.product.listProduct,
    listProductType: state.product.listProductType,
    total: state.product.total,
    isLoadingProduct: state.product.isLoadingProduct,
    isLoadingType: state.product.isLoadingType,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    producActions: bindActionCreators(producActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
