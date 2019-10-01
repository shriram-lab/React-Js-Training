import React, { Component } from 'react';
import NavBar from '../components/NavBar';
const AuthLayout = ({children, ...rest}) => {
    console.log(children)
    return (
      <div>
        <NavBar />
        <br/>
        <div>{children}</div>
      </div>
    )
  }

export default AuthLayout;