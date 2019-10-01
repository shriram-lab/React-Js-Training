import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Match, Redirect, Switch } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout/';

const AuthRoute = ({ component: Component, ...rest }) => {
    console.log(Component)
    return (<Route {...rest} render={matchProps => (

        <AuthLayout>
            <Component {...matchProps} />
        </AuthLayout>
    )} />
    )
}

export default AuthRoute;