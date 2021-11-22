import { Card, CardContent, CardMedia, Fade, Typography } from '@material-ui/core';
import { Rating, Skeleton } from '@material-ui/lab';
import React from 'react';
import { Link } from 'react-router-dom';
import IProduct from '../../Interfaces/product';
import styles from './styles';
import Lazy from 'react-lazyload';
import cn from 'classname';

const Electronic = ({ electroniceItem }: any) => {
  const { electronic, price, image, discount } = electroniceItem;
  const { name, des } = electronic || {};
  const classes = styles();
  const format = function (number: number, n: number, x: number) {
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };
  return (
    <Lazy offset={100} height={200} once={true} placeholder={'...loading'}>
      <Link
        className={cn(classes.itemLink, { [classes.disable]: !electroniceItem.id })}
        to={`/product/detail/${electroniceItem.id}`}
      >
        <Card className={classes.product}>
          {!image ? (
            <Skeleton variant="rect" className={classes.media} />
          ) : (
            <Fade in={true} timeout={300}>
              <CardMedia className={classes.media} image={image} />
            </Fade>
          )}
          {name && price ? (
            <CardContent className={classes.cardContent}>
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                className={classes.name}
              >
                {name + ' '}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
                component="p"
                className={classes.description}
              >
                {des + ' '}
              </Typography>
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

export default Electronic;
