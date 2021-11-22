import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styles from './styles'
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CURRENT_CART } from '../../Constants/order';
import { useHistory } from 'react-router';
import { CartItem } from '../../models/order';
import { RootState } from '../../Reducers';
import { Link } from 'react-router-dom';

export default function Cart() {
  const classes = styles();
  const dispatch = useDispatch();
  const history = useHistory()
  const listCartItem: CartItem[] = useSelector((state: RootState) => state.cart?.cart?.listCartItem);
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      renderCell: (a: any) => {
        console.log(a)
        return <Link to={'/product/detail/' + a?.row?.bookItemID}><img src={a.row.image} width="100%" height="100%" style={{ objectFit: 'contain' }} ></img></Link>
      }
    },
    { field: 'title', headerName: 'Name', width: 200 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 160,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'total',
      headerName: 'sub total',
      width: 160,
      renderCell: (props: any) => {
        return Math.round(props.row.price * props.row.quantity)
      }
    },
  ];

  const rows = listCartItem?.map((item: any) => ({
    id: item.id,
    bookItemID: item.bookItem.id,
    image: item.bookItem.image,
    title: item.bookItem.book.title,
    quantity: item.quantity,
    price: Math.round(item.bookItem.price)
  })) || []
  const change = (state: any) => {
    let listCartItemChecked = listCartItem.filter((item: CartItem) => {
      return state.includes(item.id)
    });
    localStorage.setItem('listCart', JSON.stringify(listCartItemChecked))
  }
  const onSubmit = () => {
    history.push('/order');
  }
  return (
    <div className={classes['cart']}>
      <div className={classes['cart__container']}>
        <h2 className={classes['cart__title']}>Giỏ hàng</h2>
        <DataGrid
          className={classes['cart__table']}
          rows={rows}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          checkboxSelection
          onSelectionModelChange={change}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button style={{ margin: '12px 0' }} variant="contained" onClick={onSubmit}>Giao hàng</Button>
        </div>
      </div>
    </div>
  )
}
