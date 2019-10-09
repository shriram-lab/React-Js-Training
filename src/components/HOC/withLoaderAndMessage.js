/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';


function withLoaderAndMessage(WrapperComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loader: false,
                dataLen: [],
            };
            // console.log('HOC call ', props);
        }

        loaderOn = (event) => {
            this.setState({
                loader: true,
                dataLen: this.props.data.length,
            });
        }

        loaderOff = (event) => {
            this.setState({
                loader: false,
                dataLen: this.props.data.length,
            });
        }

        render() {
            // console.log('hocbb', this.props);
            return ( < > {
                    (this.props.data.length < 0 ? this.loaderOn : this.loaderOff)
                }

                <
                WrapperComponent dataLen = { this.props.data.length }
                loader = { this.state.loader } {...this.props }
                /> </ >


            );
        }
    };
}


export default withLoaderAndMessage;