import React, { Component } from 'react'
import ReservationHeader from './ReservationHeader/ReservationHeader'
import ReservationList from './ReservationList'
export default class ReservationGrund extends Component {
    render() {
        return (
            <div>
                <ReservationHeader/>
                <ReservationList/>
            </div>
        )
    }
}
