import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import styles from './styles'
import { Button } from '@material-ui/core';

export default function Cart() {
  const classes = styles();
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  const change = (state) => {
    console.log(state);

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
          <Button style={{ margin: '12px 0' }} variant="contained">Thanh toán</Button>
        </div>
      </div>
    </div>
  )
}
