/* eslint-disable no-undef */
import React, {Component} from 'react';

export default function localStorageAuthHOC(LocalStorageComponent){
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                getLocalItem:this.getLocalItem,
                setLocalItem:this.setLocalItem,
                removeLocalItem:this.removeLocalItem,
                clearLocalItems:this.clearLocalItems
            }
        }

        getLocalItem = name =>{
            return localStorage.getItem(name);
        }

        setLocalItem = (name,token) =>{
            localStorage.setItem(name,token);
        }

        removeLocalItem = name =>{
            localStorage.removeItem(name)
        }

        clearLocalItems = () =>{
            localStorage.clear();
        }


        render() { 
            return (<LocalStorageComponent localStorageEvent = {this.state} {...this.props}></LocalStorageComponent>);
        }
    }
}
