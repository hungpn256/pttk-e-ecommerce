import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { BookItem } from '../../models/book';
import styles from './styles';

const ProductSearch = ({ bookItem }: { bookItem: BookItem }) => {
  const format = function (number: number, n: number, x: number) {
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };
  const classes = styles();
  const { id, book, image, price } = bookItem;
  const { title } = book;
  return (
    <Link to={`/product/detail/${id}`} style={{ textDecoration: 'none' }}>
      <Card
        className={classes.card}
        onClick={() => {
          console.log('s');
        }}
      >
        <img className={classes.image} src={image} alt=""></img>
        <CardContent>
          <div className={classes.name}>{title}</div>
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
