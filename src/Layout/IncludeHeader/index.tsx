import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const LayoutIncludeHeader = ({ children, history }: React.Component) => {
  return (
    <div>
      <Header history={history}></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default LayoutIncludeHeader;
