import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const LayoutIncludeHeader = ({ children }: React.Component) => {
  return (
    <div>
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default LayoutIncludeHeader;
