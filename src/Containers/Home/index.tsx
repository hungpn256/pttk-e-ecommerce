import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import cn from 'classname';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarouselComponent from '../../Components/Carousel';
import ClothesList from '../../Components/ClothesList';
import ElectronicList from '../../Components/ElectronicList';
import ProductList from '../../Components/ProductList';
import ShoesList from '../../Components/ShoesList';
import { RootState } from '../../Reducers';
import servicePublic from '../../Service/public';
import * as producActions from './../../Actions/product';
import styles from './styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        children
      )}
    </div>
  );
}
const Home = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const { listProduct, total, isLoadingProduct } = useSelector(
    (state: RootState) => state.product
  );
  const [listElectronic, setListElectronic] = useState([])
  const [listClothes, setlistClothes] = useState([])
  const [listShoes, setlistShoes] = useState([])
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
    (async () => {
      const res: any = await Promise.all([servicePublic.getElectronic(), servicePublic.getClothes(), servicePublic.getShoes()])
      setListElectronic(res[0].data);
      setlistClothes(res[1].data)
      setlistShoes(res[2].data)
    })()

    return () => {
      dispatch(changeStates({ listProduct: [] }));
    };

  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

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
            <CarouselComponent listImage={listImage} />
          </div>

          <div className={classes.imageAdvertisement}>
            <img
              style={{ width: '100%', height: '100%' }}
              src="https://salt.tikicdn.com/cache/w408/ts/banner/aa/3b/b3/403c766e847f8a4509ad21f6cadcb6bb.jpg"
              alt=""
            />
          </div>
        </div>

        <Paper style={{ marginTop: 50, backgroundColor: '#f0f0f0' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Sách" >
            </Tab>
            <Tab label="Điện tử" />
            <Tab label="Quần áo" />
            <Tab label="Giày" />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <div className={classes.listProduct}>
            <ProductList
              onChangePage={handleChangePage}
              paging={paging}
              listProduct={listProductCurrent}
              total={total}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className={classes.listProduct}>
            <ElectronicList
              listProduct={listElectronic}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className={classes.listProduct}>
            <ClothesList
              listProduct={listClothes}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <div className={classes.listProduct}>
            <ShoesList
              listProduct={listShoes}
            />
          </div>
        </TabPanel>
      </div>
      ,
    </div>
  );
};

export default Home;
