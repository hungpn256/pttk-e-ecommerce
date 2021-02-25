import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const Test = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  useEffect(() => {
    dispatch({
      type: 'FESAD',
      payload: 0,
    });
  }, []);
  return <div>sds</div>;
};
export default Test;
