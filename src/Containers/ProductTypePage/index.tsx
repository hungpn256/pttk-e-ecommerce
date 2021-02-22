import cn from 'classname';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CarouselComponent from '../../Components/Carousel';
import ProductList from '../../Components/ProductList';
import { IProductType } from '../../Components/ProductType';
import ProductTypeList from '../../Components/ProductTypeList';
import IProduct from '../../Interfaces/product';
import * as producActions from './../../Actions/product';
import styles from './styles';
import { useParams } from 'react-router-dom';
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
  const params = useParams();
  const [paging, setPaging] = React.useState({
    page: 1,
    limit: 24,
    cond: {
      ProductType: params._id,
    },
  });
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaging({ ...paging, page: value });
  };
  useEffect(() => {
    const { fetchProductListType } = producActions;
    fetchProductListType();
  }, []);
  useEffect(() => {
    setPaging({ ...paging, page: 1, cond: { ...paging.cond, ProductType: params._id } });
  }, [params]);
  useEffect(() => {
    const { fetchProductList, changeStates } = producActions;
    fetchProductList(paging);
    return () => {
      changeStates({ listProduct: [] });
    };
  }, [paging]);
  const listProductCurrent = isLoadingProduct ? Array(24).fill({}) : listProduct;

  return (
    <div className={classes.home}>
      <div className={cn('container', classes.content)}>
        <div className={classes.listProductType}>
          <ProductTypeList
            params={params}
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
