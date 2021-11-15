import { Button, Card, Container, Divider, Fade, List, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Rating, Skeleton } from '@material-ui/lab';
import cn from 'classname';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as producActions from '../../Actions/product';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ADD_TO_CART } from '../../Constants/order';
import { useHistory } from 'react-router'
import { RootState } from '../../Reducers';
function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      onKeyPress={(e) => false}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}
const ProductDetail = () => {
  const classes = styles();
  const bookItem = useSelector((state: RootState) => state.product.record);
  const dispatch = useDispatch();
  const params: { _id: string } = useParams();
  const { _id } = params;
  const [check, setCheck] = useState(false);
  const [values, setValues] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.target.value) <= 0 || event.target.value.indexOf('-') !== -1) setValues(0);
    else setValues(parseInt(event.target.value));
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const { fetchProductDetail, changeStates } = producActions;
    dispatch(fetchProductDetail(_id));
    return () => {
      setCheck(false);
      dispatch(changeStates({ record: {} }));
    };
  }, [params]);
  const format = function (number: number, n: number, x: number) {
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };
  const cart = useSelector((state: any) => state.cart?.cart);
  const history = useHistory()
  const onBuy = () => {
    if (!cart) {
      history.push('/login')
    }
    else {
      dispatch({
        type: ADD_TO_CART, payload: {
          quantity: values,
          cardID: cart.id,
          bookItemID: bookItem.id
        }
      })
    }
  }
  return (
    <div className={classes.background}>
      <div className={cn('container')}>
        <Card className={classes.cardMain}>
          <div className={classes.wrapperImageMain}>
            {check ? (
              <Fade in={check}>
                <img src={bookItem?.image} className={classes.imageMain} alt="" />
              </Fade>
            ) : (
              <>
                <Skeleton className={classes.imageMain} />
                <img
                  src={bookItem.image}
                  style={{ display: 'none' }}
                  alt=""
                  onLoad={() => {
                    setCheck(true);
                  }}
                />
              </>
            )}
          </div>
          <div className={classes.infoProduct}>
            {!check ? (
              <>
                <Skeleton className={classes.nameProduct} width={'100%'} />
                <Skeleton className={classes.nameProduct} width={'60%'} />
              </>
            ) : (
              <>
                <h3 className={classes.nameProduct}>{bookItem?.book?.title}</h3>
                <div className={classes.price}>
                  {bookItem?.price && format(bookItem?.price, 0, 3)}
                  <span className={classes.vnd}>đ</span>
                </div>
                <Divider />
                <Typography className={classes.askAdress}>
                  Bạn hãy NHẬP ĐỊA CHỈ nhận hàng để được dự báo thời gian & chi phí giao hàng một
                  cách chính xác nhất.{' '}
                </Typography>
                <Divider />
                <Typography className={classes.amount}>Số lượng:</Typography>
                <div className={classes.inputNumber}>
                  <Button
                    className={classes.btnNumber}
                    onClick={() => {
                      setValues(values - 1);
                    }}
                  >
                    <RemoveIcon></RemoveIcon>
                  </Button>

                  <TextField
                    className={classes.textFieldNumber}
                    variant="outlined"
                    value={values}
                    onChange={handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    onKeyPress={(e) => false}
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                    }}
                  />
                  <Button
                    className={classes.btnNumber}
                    onClick={() => {
                      setValues(values + 1);
                    }}
                  >
                    <AddIcon></AddIcon>
                  </Button>
                </div>
                <Button
                  className={classes.btnBuy}
                  variant="contained"
                  color="secondary"
                  onClick={onBuy}
                >
                  Chọn mua
                </Button>
              </>
            )}
          </div>
        </Card>

        {bookItem?.book && <Card className={classes.cardDes}>
          <Container>
            <h3 className={classes.title}>Mô tả</h3>
            <List component="nav" aria-label="contacts">
              {Object.keys(bookItem?.book).map((key) => {
                console.log(key, 'key');
                if (key === 'id') return;
                if (typeof bookItem?.book[key] !== 'object')
                  return <ListItem>
                    <ListItemText primary={`${key}: ${bookItem?.book[key]}`} />
                  </ListItem>
                else {
                  return <>
                    <ListItem>
                      <ListItemText primary={`${key}:`} />
                    </ListItem>
                    <Container>
                      <List component="nav" aria-label="contacts">
                        {Object.keys(bookItem?.book[key]).map((key2) => {
                          if (typeof bookItem?.book[key][key2] !== 'object' && key2 !== 'id')
                            return <ListItem>
                              <ListItemText primary={`${key2}: ${bookItem?.book[key][key2]}`} />
                            </ListItem>
                        })
                        }
                      </List>
                    </Container></>
                }
              })
              }
            </List>
          </Container>
        </Card>}

      </div>
    </div>
  );
};

export default ProductDetail;
