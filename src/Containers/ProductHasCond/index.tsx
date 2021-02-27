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
  console.log(queryParams);
  const { search, ...cond } = queryParams;
  const [paging, setPaging] = React.useState({
    page: 1,
    limit: 24,
    cond: {
      ...cond,
    },
  });
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaging({ ...paging, page: value });
  };
  useEffect(() => {
    setPaging({ ...paging, ...queryParams });
    const { fetchProductListType } = producActions;
    dispatch(fetchProductListType());
  }, []);
  useEffect(() => {
    setPaging({ ...paging, cond: { ...cond } });
    if (search) {
      setPaging({ ...paging, search: search });
    }
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
