import React, { Component } from 'react'
import MainLogo from '../../MainScreen/MainHeader/MainLogo'
import ReservationTab from './ReservationTab'
export default class MainHeader extends Component {
    render() {
        return (
            <div>
                <MainLogo/>
                <ReservationTab/>
            </div>
        )
    }
}
