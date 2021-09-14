import React, { Component } from 'react';
import MyLoad from './MyLoad';
import MainLogo from '../MainScreen/MainHeader/MainLogo';

class MyInfo extends Component {
    render() {
        return (
            <div>
                <MainLogo/>
                <MyLoad/>
            </div>
        );
    }
}

export default MyInfo;