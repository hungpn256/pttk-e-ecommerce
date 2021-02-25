import cn from 'classname';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductList from '../../Components/ProductList';
import ProductTypeList from '../../Components/ProductTypeList';
import styles from './styles';
import * as producActions from '../../Actions/product';
const Home = () => {
  const classes = styles();
  const { listProduct, listProductType, total, isLoadingProduct, isLoadingType } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
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
    dispatch(fetchProductListType());
  }, []);
  useEffect(() => {
    setPaging({ ...paging, page: 1, cond: { ...paging.cond, ProductType: params._id } });
  }, [params]);
  useEffect(() => {
    const { fetchProductList, changeStates } = producActions;
    dispatch(fetchProductList(paging));
    return () => {
      dispatch(changeStates({ listProduct: [] }));
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
export default Home;
