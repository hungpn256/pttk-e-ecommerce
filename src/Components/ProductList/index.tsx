import { Card, CardHeader, Divider } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import IProduct from './../../Interfaces/product';
import Product from './../Product/index';
import styles from './styles';
interface IProductList {
  listProduct: Array<IProduct>;
  total: number;
  paging: {
    limit: number;
    page: number;
    cond: any;
  };
  onChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}
const ProductList = ({ listProduct, total, onChangePage, paging }: IProductList) => {
  const classes = styles();
  function renderProducts(listProduct: Array<IProduct>) {
    return listProduct.map((product, index) => {
      return <Product product={product} key={index} />;
    });
  }
  return (
    <div>
      <Card>
        <CardHeader className={classes.title} component="h3" title="Sản phẩm"></CardHeader>
        <Divider />
        {listProduct.length === 0 ? (
          <h2 className={classes.empty}>Không tồn tại mặt hàng này</h2>
        ) : (
          <>
            <div className={classes.productList}>{renderProducts(listProduct)}</div>
            {total > paging?.limit && (
              <Pagination
                className={classes.pagination}
                count={Math.ceil(total / paging?.limit)}
                page={paging?.page ?? 1}
                onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                  onChangePage(event, value)
                }
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default ProductList;
