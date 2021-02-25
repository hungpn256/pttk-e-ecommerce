import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

const ProductSearch = ({ product }) => {
  const format = function (number: number, n: number, x: number) {
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };
  const classes = styles();
  const { _id, name, image, price } = product;
  return (
    <Link to={`/product/detail/${_id}`} style={{ textDecoration: 'none' }}>
      <Card
        className={classes.card}
        onClick={() => {
          console.log('s');
        }}
      >
        <img className={classes.image} src={image} alt=""></img>
        <CardContent>
          <div className={classes.name}>{name}</div>
          <div className={classes.price}>
            {price && format(price, 0, 3)}
            <u>đ</u>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductSearch;
