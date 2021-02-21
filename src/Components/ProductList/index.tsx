import { Card, CardHeader, Divider } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import IProduct from './../../Interfaces/product';
import Product from './../Product/index';
import styles from './styles';
interface IProductList {
  listProduct: Array<IProduct>;
  limit: number;
}
const ProductList = ({ listProduct, limit, total }: IProductList) => {
  const classes = styles();
  function renderProducts(listProduct: Array<IProduct>) {
    return listProduct.map((product, index) => {
      return <Product product={product} key={index} />;
    });
  }
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [page, setPage] = React.useState(1);
  const listProductCurrent = listProduct.slice((page - 1) * limit, page * limit);
  return (
    <div>
      <Card>
        <CardHeader className={classes.title} component="h3" title="Sản phẩm"></CardHeader>
        <Divider />
        <div className={classes.productList}>{renderProducts(listProductCurrent)}</div>
        {listProduct.length > limit && (
          <Pagination
            className={classes.pagination}
            count={Math.ceil(total / limit)}
            page={page}
            onChange={handleChange}
          />
        )}
      </Card>
    </div>
  );
};

export default ProductList;
