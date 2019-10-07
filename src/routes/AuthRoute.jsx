/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-useless-path-segments
import AuthLayout from '../layouts/AuthLayout/';
import localStorageAuthHOC from "../configs/localStorage/localStorage";
import Login from "../pages/Login";
import PrivateLayout from '../layouts/PrivateLayout';

const AuthRoute = ({ component: Component, ...rest }) => {
    const {localStorageEvent} = rest;
    
    if(localStorageEvent.getLocalItem('token')!=="null"){
        return (<Route {...rest} render={matchProps => (
            <AuthLayout>
                <Component {...matchProps} />
            </AuthLayout>
        )} />
        )
    }else{
        return (<Route {...rest} render={matchProps => (
            <PrivateLayout>
                <Login {...matchProps} />
            </PrivateLayout>
                
            
        )} />
        )
    }
    
}

export default localStorageAuthHOC(AuthRoute);