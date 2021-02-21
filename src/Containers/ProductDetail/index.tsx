import { Button, Card, Divider, Fade, TextField, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Rating } from '@material-ui/lab';
import cn from 'classname';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import LoadingGlobal from '../../Components/LoadingGlobal';
import IProduct from '../../Interfaces/product';
import * as producActions from './../../Actions/product';
import styles from './styles';
interface Props {
  producActions: { fetchProductDetail: (_id: string) => { type: string; payload: any } };
  product: IProduct;
}
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
const ProductDetail = ({ producActions, product }: Props) => {
  const classes = styles();
  const params: { _id: string } = useParams();
  const { _id } = params;
  const [check, setCheck] = useState(false);
  const [values, setValues] = React.useState(0);
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
    fetchProductDetail(_id);
    return () => {
      setCheck(false);
      changeStates({ record: {} });
    };
  }, []);
  const format = function (number: number, n: number, x: number) {
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return number.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
  };
  console.log(product, 'p');
  if (!check)
    return (
      <div>
        <LoadingGlobal></LoadingGlobal>
        <img
          src={product.image}
          style={{ display: 'none' }}
          className={classes.imageMain}
          alt=""
          onLoad={() => {
            setCheck(true);
          }}
        />
        ;
      </div>
    );
  return (
    <div className={classes.background}>
      <div className={cn('container')}>
        <Card className={classes.cardMain}>
          <div className={classes.wrapperImageMain}>
            {check ? (
              <Fade in={check}>
                <img src={product?.image} className={classes.imageMain} alt="" />
              </Fade>
            ) : (
              <div>loading</div>
            )}
          </div>
          <div className={classes.infoProduct}>
            <h3 className={classes.nameProduct}>{product?.name}</h3>
            <Rating
              className={classes.rating}
              value={product?.evaluation}
              readOnly
              precision={0.5}
              size="medium"
            />
            <div className={classes.price}>
              {format(product?.price, 0, 3)}
              <span className={classes.vnd}>đ</span>
            </div>
            <Divider />
            <Typography className={classes.askAdress}>
              Bạn hãy NHẬP ĐỊA CHỈ nhận hàng để được dự báo thời gian & chi phí giao hàng một cách
              chính xác nhất.{' '}
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
              onClick={() => {
                setValues(values + 1);
              }}
            >
              Chọn mua
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    product: state.product.record,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    producActions: bindActionCreators(producActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
