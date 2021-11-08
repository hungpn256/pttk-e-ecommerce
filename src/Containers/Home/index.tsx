import cn from 'classname';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarouselComponent from '../../Components/Carousel';
import ProductList from '../../Components/ProductList';
import ProductTypeList from '../../Components/ProductTypeList';
import * as producActions from './../../Actions/product';
import styles from './styles';

const Home = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const { listProduct, listProductType, total, isLoadingProduct, isLoadingType } = useSelector(
    (state) => state.product
  );
  const [paging, setPaging] = React.useState({
    page: 1,
    limit: 24,
    cond: {},
  });
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaging({ ...paging, page: value });
  };
  // useEffect(() => {
  //   const { fetchProductListType } = producActions;
  //   dispatch(fetchProductListType());
  // }, []);
  useEffect(() => {
    const { fetchProductList, changeStates } = producActions;
    dispatch(fetchProductList());
    return () => {
      dispatch(changeStates({ listProduct: [] }));
    };
  }, []);
  const listProductCurrent = isLoadingProduct ? Array(24).fill({}) : listProduct;
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
      ,
    </div>
  );
};

export default Home;
