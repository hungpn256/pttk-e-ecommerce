import cn from 'classname';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import ProductList from '../../Components/ProductList';
import ProductTypeList from '../../Components/ProductTypeList';
import qs from 'query-string';
import styles from './styles';
import * as producActions from '../../Actions/product';
const Home = () => {
  const classes = styles();
  const { listProduct, listProductType, total, isLoadingProduct, isLoadingType } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = qs.parse(location.search);

  const paging = useSelector((state) => state.product.paging);
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(producActions.changeStates({ paging: { ...paging, page: value } }));
  };
  useEffect(() => {
    const { fetchProductListType } = producActions;
    dispatch(fetchProductListType());
  }, []);
  useEffect(() => {
    const { search, ...cond } = queryParams;
    dispatch(
      producActions.changeStates({
        paging: {
          page: 1,
          limit: 24,
          cond: { ...cond },
          search: search,
        },
      })
    );
  }, [location]);
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
            paging={paging}
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
