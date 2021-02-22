import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';

const ProductSearch = ({ product }) => {
  const classes = styles();
  const { _id, name, image } = product;
  return (
    <Link to={`/product/detail/${_id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        <img className={classes.image} src={image} alt=""></img>
        <CardContent className={classes.name}>{name}</CardContent>
      </Card>
    </Link>
  );
};

export default ProductSearch;
