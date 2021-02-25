import { Card, CardContent, CardMedia, Fade, Typography } from '@material-ui/core';
import { Rating, Skeleton } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';
import IProduct from './../../Interfaces/product';
import styles from './styles';
import Lazy from 'react-lazyload';
import cn from 'classname';
interface ProductProps {
  product: IProduct;
}

const Product = ({ product }: ProductProps) => {
  const { name, description, price, image, evaluation } = product;
  const classes = styles();
  const format = function (number: number, n: number, x: number) {
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };
  return (
    <Lazy offset={100} height={200} once={true} placeholder={'...loading'}>
      <Link
        className={cn(classes.itemLink, { [classes.disable]: !product._id })}
        to={`/product/detail/${product._id}`}
      >
        <Card className={classes.product}>
          {!image ? (
            <Skeleton variant="rect" className={classes.media} />
          ) : (
            <Fade in={true} timeout={300}>
              <CardMedia className={classes.media} image={image} />
            </Fade>
          )}
          {name && description && price ? (
            <CardContent className={classes.cardContent}>
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                className={classes.description}
              >
                {name + ' '}-{' ' + description}
              </Typography>
              <Rating
                value={evaluation}
                readOnly
                className={classes.rating}
                precision={0.5}
                size="small"
              />
              <div className={classes.price}>
                Giá:<span className={classes.vnd}>đ</span>
                {format(price, 0, 3)}
              </div>
            </CardContent>
          ) : (
            <Skeleton variant="text" height={95} width={190} />
          )}
        </Card>
      </Link>
    </Lazy>
  );
};

export default Product;
