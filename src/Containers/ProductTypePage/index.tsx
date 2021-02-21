import cn from 'classname';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductList from '../../Components/ProductList';
import { IProductType } from '../../Components/ProductType';
import ProductTypeList from '../../Components/ProductTypeList';
import IProduct from '../../Interfaces/product';
import * as producActions from './../../Actions/product';
import styles from './styles';
interface IHome {
  producActions: {
    fetchProductList: () => { type: string; payload: object };
    fetchProductListType: () => { type: string; payload: object };
  };
  listProduct: Array<IProduct>;
  listProductType: Array<IProductType> | Array<object>;
  total: number;
}
const Home = ({ producActions, listProduct, listProductType, total }: IHome) => {
  const classes = styles();
  useEffect(() => {
    const { fetchProductList, fetchProductListType } = producActions;
    fetchProductList();
    fetchProductListType();
  }, []);
  const limit = 24;
  const listImage = [
    { image: 'https://cf.shopee.vn/file/a58eb76fc3d22916cd6948fd4dc50e08_xxhdpi' },
    { image: 'https://cf.shopee.vn/file/a58eb76fc3d22916cd6948fd4dc50e08_xxhdpi' },
    { image: 'https://cf.shopee.vn/file/be351e907b0f3a39a14c1c4a6c63b2e6_xxhdpi' },
    { image: 'https://cf.shopee.vn/file/be351e907b0f3a39a14c1c4a6c63b2e6_xxhdpi' },
  ];
  return (
    <div className={classes.home}>
      <div className={cn('container', classes.content)}>
        <div className={classes.listProductType}>
          <ProductTypeList
            listProductType={
              listProductType.length > 0
                ? listProductType
                : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
            }
          />
        </div>
        <div className={classes.listProduct}>
          <ProductList
            listProduct={
              listProduct.length > 0
                ? listProduct
                : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
            }
            limit={limit}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    listProduct: state.product.listProduct,
    listProductType: state.product.listProductType,
    total: state.product.total,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    producActions: bindActionCreators(producActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
