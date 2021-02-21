import React from 'react';
import Carousel from 'react-material-ui-carousel';
import styles from './styles';
import Skeleton from '@material-ui/lab/Skeleton';
const CarouselComponent = (props: { listImage: Array<{ image: string }> }) => {
  const { listImage, options } = props;
  const classes = styles();
  return (
    <Carousel {...options} width="100%" height="100%">
      {listImage ? (
        listImage.map((item, index) => (
          <img className={classes.image} src={item.image} key={index} alt="" />
        ))
      ) : (
        <Skeleton className={classes.image} width="100%" height="100%" />
      )}
    </Carousel>
  );
};

export default CarouselComponent;
