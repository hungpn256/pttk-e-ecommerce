import { Card, CardContent, CardHeader, CardMedia, Grow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';
export interface IProductType {
  _id: string;
  name: string;
  image: string;
}
const ProductTypes = ({ productType }: { productType: IProductType }) => {
  const classes = styles();
  const { name, image, _id } = productType;
  return (
    <Card className={classes.productType}>
      <Link to={`/product/type/${_id}`} className={classes.linkProductType}>
        <CardMedia className={classes.imageWrapper}>
          {image && name ? (
            <Grow in={true} timeout={500}>
              <img className={classes.imgProductType} src={image} alt="" />
            </Grow>
          ) : (
            <Skeleton variant="rect" className={classes.imgProductType} />
          )}
        </CardMedia>
        <div className={classes.wrapperName}>
          {image && name ? (
            <div className={classes.nameProductType}>{name}</div>
          ) : (
            <Skeleton variant="text" className={classes.nameProductType} />
          )}
        </div>
      </Link>
    </Card>
  );
};

export default ProductTypes;
