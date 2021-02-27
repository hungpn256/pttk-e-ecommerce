import { Card, CardMedia, Grow } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import cn from 'classname';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';
export interface IProductType {
  _id: string;
  name: string;
  image: string;
}
const ProductTypes = ({
  productType,
  paging,
}: {
  productType: IProductType;
  paging: { cond: { ProductType?: string } };
}) => {
  const classes = styles();
  const idActive = paging?.cond?.ProductType ?? '';
  const { name, image, _id } = productType;
  useEffect(() => {
    if (idActive === _id) {
      document.getElementById(_id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);
  return (
    <Card
      className={cn(classes.productType, {
        [classes.active]: idActive === _id,
        [classes.disable]: !productType._id,
      })}
      id={_id}
    >
      <Link className={cn(classes.linkProductType)} to={`/products?ProductType=${_id}`}>
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
