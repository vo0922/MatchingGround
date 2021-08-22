import React, { Component } from 'react';
import MainLogo from '../MainScreen/MainHeader/MainLogo';
import MyLoad from './MyLoad';

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