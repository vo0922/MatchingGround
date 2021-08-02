import React, { Component } from 'react'
import MainLogo from './MainLogo'
import MainTab from './MainTab'
export default class MainHeader extends Component {
    render() {
        return (
            <div>
                <MainLogo/>
                <MainTab/>
            </div>
        )
    }
}
