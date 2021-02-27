import React from 'react';
import styles from './styles';
import { IProductType } from './../ProductType/index';
import ProductType from './../ProductType';
import { Card, CardHeader, Divider } from '@material-ui/core';
const ProductTypeList = ({
  listProductType,
  lineNumber,
  paging,
}: {
  listProductType: Array<IProductType>;
  lineNumber?: number;
  paging: { cond: { ProductType?: string } };
}) => {
  const classes = styles();
  function renderProducts(listProductType: Array<IProductType>) {
    return listProductType.map((productType, index) => {
      return <ProductType productType={productType} key={index} paging={paging} />;
    });
  }
  return (
    <Card>
      <CardHeader className={classes.title} component="h3" title="Danh mục"></CardHeader>
      <Divider />
      <div
        style={{ maxHeight: lineNumber ? lineNumber * 200 : 200 }}
        className={classes.productTypeList}
      >
        {renderProducts(listProductType)}
      </div>
    </Card>
  );
};

export default ProductTypeList;
