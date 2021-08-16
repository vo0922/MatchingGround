import React, { Component } from 'react'
import ReservationLogo from './ReservationLogo'
import ReservationTab from './ReservationTab'
export default class MainHeader extends Component {
    render() {
        return (
            <div>
                <ReservationLogo/>
                <ReservationTab/>
            </div>
        )
    }
}
