import React, { Component } from 'react';
import Footer from '../components/Footer';
const PrivateLayout = ({children, ...rest}) => {
    console.log(children)
    return (
      <div>
        <div>{children}</div>
        <div>
          <Footer></Footer>
        </div>
      </div>
    )
  }

export default PrivateLayout;