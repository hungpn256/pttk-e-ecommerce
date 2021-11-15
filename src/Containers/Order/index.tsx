import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styles from './styles'
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { CartItem, Payment, Shipment } from '../../models/order';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_ORDER, GET_ALL_PAYMENT, GET_ALL_SHIPMENT } from '../../Constants/order';
import { RootState } from '../../Reducers';

export default function Order() {
  const classes = styles();
  const [shipment, setShipment] = useState(-1);
  const [payment, setPayment] = useState(-1);
  const [listCartItem, setListCartItem] = useState([]);
  const listPayment: Payment[] = useSelector((state: RootState) => state.cart.payment)
  const cartID: number = useSelector((state: RootState) => state.cart?.cart?.id)
  const listShipment: Shipment[] = useSelector((state: RootState) => state.cart.shipment)
  const dispatch = useDispatch();
  useEffect(() => {
    const l = JSON.parse(localStorage.getItem('listCart') || '');
    setListCartItem(l);
    dispatch({ type: GET_ALL_SHIPMENT })
  }, [])
  useEffect(() => {
    shipment >= 0 && dispatch({ type: GET_ALL_PAYMENT, payload: shipment })
  }, [shipment])
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
        return <img src={a.row.image} width="100%" height="100%" style={{ objectFit: 'contain' }} ></img>
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
        return props.row.price * props.row.quantity
      }
    },
  ];

  const rows = listCartItem?.map((item: CartItem) => ({
    id: item.id,
    image: item.bookItem.image,
    title: item.bookItem.book.title,
    quantity: item.quantity,
    price: item.bookItem.price
  })) || []
  const handleChangePayment = (event: any) => {
    setPayment(event.target.value);
  };
  const handleChangeShipment = (event: any) => {
    setShipment(event.target.value);
  };
  const onSubmit = () => {
    let payload = { listCartItem, cartID, paymentID: payment, shipmentID: shipment }
    dispatch({ type: ADD_ORDER, payload })
  }
  return (
    <div className={classes['cart']}>
      <div className={classes['cart__container']}>
        <h2 className={classes['cart__title']}>Thanh toán</h2>
        <DataGrid
          className={classes['cart__table']}
          rows={rows}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
        />
        <div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Ship</InputLabel>
            <Select
              className={classes['select']}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleChangeShipment}
              label="Phương thức thanh toán"
              value={shipment}
              defaultValue={-1}
            >
              <MenuItem value={-1}>Vui lòng chọn</MenuItem>
              {listShipment && listShipment.map((item, index) => {
                return <MenuItem value={item.id}>{item.supplier + ' ' + item.type + " " + item.price}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Phương thức thanh toán</InputLabel>
            <Select
              className={classes['select']}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={handleChangePayment}
              label="Phương thức thanh toán"
              value={payment}
            >
              <MenuItem value={-1}>Vui lòng chọn</MenuItem>
              {listPayment && listPayment.map((item, index) => {
                return <MenuItem key={item.id} value={item.id}>{item.supplier || '' + ' ' + item.type}</MenuItem>
              })}
            </Select>
          </FormControl>

        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <div style={{ marginRight: 10, fontSize: 24, fontWeight: 'bold', color: 'red' }}>{listCartItem && listCartItem.length && listCartItem?.reduce((priceTotal: number, item: any) => item.bookItem.price * item.quantity + priceTotal, 0)} đ</div>
          <Button style={{ margin: '12px 0' }} variant="contained" onClick={onSubmit}>Thanh toán</Button>
        </div>
      </div>
    </div >
  )
}
