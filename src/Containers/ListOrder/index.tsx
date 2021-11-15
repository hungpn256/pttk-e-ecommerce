import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styles from './styles'
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { CartItem, Payment, Shipment } from '../../models/order';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ORDER, GET_ALL_ORDER, GET_ALL_PAYMENT, GET_ALL_SHIPMENT } from '../../Constants/order';
import { RootState } from '../../Reducers';
import moment from 'moment';

export default function ListOrder() {
  const classes = styles();
  const dispatch = useDispatch();
  const listOrder = useSelector((state: RootState) => state.cart.listOrder)
  const customer = useSelector((state: RootState) => state.auth.customer)
  useEffect(() => {
    if (customer)
      dispatch({ type: GET_ALL_ORDER })
  }, [customer])
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 250,
      renderCell: (a: any) => {
        return <img src={a.row.image} width="100%" height="100%" style={{ objectFit: 'contain' }} ></img>
      }
    },
    {
      field: 'dateCreat',
      headerName: 'Created At',
      width: 400,
      renderCell: (a: any, b) => {
        return moment(b).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 300,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 300,
    },
  ];

  // const rows = listCartItem?.map((item: CartItem) => ({
  //   id: item.id,
  //   image: item.bookItem.image,
  //   title: item.bookItem.book.title,
  //   quantity: item.quantity,
  //   price: item.bookItem.price
  // })) || []
  const rows = listOrder

  return (
    <div className={classes['cart']}>
      <div className={classes['cart__container']}>
        <h2 className={classes['cart__title']}>Lịch sử đặt hàng</h2>
        <DataGrid
          className={classes['cart__table']}
          rows={rows}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        </div>
      </div>
    </div >
  )
}
