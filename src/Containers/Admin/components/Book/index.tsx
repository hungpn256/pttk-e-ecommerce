import { Button, Container, Divider, Fade, Modal, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../Reducers';
import { BookItem } from '../../../../models/book';
import { fetchProductList } from '../../../../Actions/product';
import service from '../../../../Service/public'
import { resolveSrv } from 'dns';

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
      return <a href={'/product/detail/' + a?.row?.id}><img src={a.row.image} width="100%" height="100%" style={{ objectFit: 'contain' }} ></img></a>
    }
  },
  { field: 'title', headerName: 'Name', width: 300 },
  {
    field: 'author',
    headerName: 'Author',
    type: 'number',
    width: 300,
  },
  {
    field: 'publisher',
    headerName: 'Publisher',
    type: 'number',
    width: 300,
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    width: 160,
  },
];
export default function AdminBook() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductList());
  }, [])
  const classes = styles();
  const [bookItem, setBookItem] = useState({
    image: '',
    price: '',
    discount: ''
  })
  const [book, setBook] = useState({
    barcode: '',
    title: '',
    summary: '',
    pages: '',
    language: ''
  })
  const [author, setAuthor] = useState({
    name: '',
    biography: '',
  })
  const [publisher, setPublisher] = useState({
    name: '',
    address: ''
  })
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAuthor({
      name: '',
      biography: '',
    })
    setPublisher({
      name: '',
      address: ''
    })
    setBook({
      barcode: '',
      title: '',
      summary: '',
      pages: '',
      language: ''
    })
    setBookItem({
      image: '',
      price: '',
      discount: ''
    })
  };

  const { listProduct } = useSelector(
    (state: RootState) => state.product
  );

  const rows = listProduct.map((item: BookItem, index) => ({
    id: item.id,
    title: item.book.title,
    image: item.image,
    price: item.price,
    author: item.book.author.name,
    publisher: item.book.publisher.name
  }))

  const onSubmit = async () => {
    let bookSubmit = { ...book, author, publisher };
    let bookItemSubmit = { ...bookItem, book: bookSubmit };
    try {
      const res = await service.postBook(bookItemSubmit);
      handleClose()
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Quản lý sách</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Dashboard v1</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Thêm mới
          </Button>
          <DataGrid
            className={classes['cart__table']}
            rows={rows}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[10, 25, 30]}
          />
        </div>
      </section>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>

          <div className="container" style={{ backgroundColor: '#fff', padding: 40 }}>
            <h3 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Thêm sản phẩm</h3>
            <Divider />
            {bookItem.image.length > 0 &&
              <div>
                <img style={{ width: 400, height: 'auto', borderRadius: 4, margin: '0 auto', marginTop: 10 }} src={bookItem.image} alt="ảnh không hợp lệ"></img>
              </div>
            }
            <div className={classes.title}>Book Item</div>
            <div className="d-flex flex-wrap">
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Image" value={bookItem.image} onChange={(e) => setBookItem({ ...bookItem, image: e.target.value })} />
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Price" value={bookItem.price} onChange={(e) => setBookItem({ ...bookItem, price: e.target.value })} />
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Discount" value={bookItem.discount} onChange={(e) => setBookItem({ ...bookItem, discount: e.target.value })} />
            </div>
            <div className={classes.title}>Book</div>
            <div className="d-flex flex-wrap">
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Barcode" value={book.barcode} onChange={(e) => setBook({ ...book, barcode: e.target.value })} />
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Summary" value={book.summary} onChange={(e) => setBook({ ...book, summary: e.target.value })} />
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Pages" value={book.pages} onChange={(e) => setBook({ ...book, pages: e.target.value })} />
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Language" value={book.language} onChange={(e) => setBook({ ...book, language: e.target.value })} />
            </div>
            <div className={classes.title}>Author</div>
            <div className="d-flex flex-wrap">
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Name" value={author.name} onChange={(e) => setAuthor({ ...author, name: e.target.value })} />
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Biography" value={author.biography} onChange={(e) => setAuthor({ ...author, biography: e.target.value })} />
            </div>
            <div className={classes.title}>Publisher</div>
            <div className="d-flex flex-wrap">
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Name" value={publisher.name} onChange={(e) => setPublisher({ ...publisher, name: e.target.value })} />
              <TextField style={{ width: '32%', marginRight: '1%' }} required id="standard-required" label="Address" value={publisher.address} onChange={(e) => setPublisher({ ...publisher, address: e.target.value })} />
            </div>
            <Button variant="contained" color="primary" className="float-right" style={{ marginTop: 50 }} onClick={onSubmit}>
              Thêm
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
