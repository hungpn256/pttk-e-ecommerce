import { Card, CardHeader, Divider } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import IProduct from '../../Interfaces/product';
import Electronic from '../Electronic';
import Shoes from '../Shoes';
import styles from './styles';
interface IProductList {
  listProduct: any[];
  onChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}
const ShoesList = ({ listProduct }: IProductList) => {
  const classes = styles();
  function renderProducts(listProduct: Array<IProduct>) {
    return listProduct.map((shoesItem, index) => {
      return <Shoes shoesItem={shoesItem} key={index} />;
    });
  }
  return (
    <div>
      <Card>
        <CardHeader className={classes.title} component="h3" title="Shoes"></CardHeader>
        <Divider />
        {listProduct.length === 0 ? (
          <h2 className={classes.empty}>Không tồn tại mặt hàng này</h2>
        ) : (
          <>
            <div className={classes.productList}>{renderProducts(listProduct)}</div>
            {/* {total > paging?.limit && (
              <Pagination
                className={classes.pagination}
                count={Math.ceil(listProduct.length / 24)}
                page={paging?.page ?? 1}
                onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                  onChangePage(event, value)
                }
              />
            )} */}
          </>
        )}
      </Card>
    </div>
  );
};

export default ShoesList;
