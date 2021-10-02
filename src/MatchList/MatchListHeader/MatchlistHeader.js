import React, { Component } from 'react'
import MainLogo from '../../MainScreen/MainHeader/MainLogo'
import MatchlistTab from './MatchlistTab'

export default class MatchlistHeader extends Component {
    render() {
        return (
            <div>
                <MainLogo/>
                <MatchlistTab/>
            </div>
        )
    }
}
