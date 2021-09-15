import React, { Component } from 'react'
import MatchlistHeader from './MatchListHeader/MatchlistHeader'
import MatchListMain from './MatchListMain'

export default class MatchList extends Component {
    render() {
        return (
            <div>
                <MatchlistHeader/>
                <MatchListMain/>
            </div>
        )
    }
}
