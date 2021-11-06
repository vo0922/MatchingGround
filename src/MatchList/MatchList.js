import React, { Component } from 'react'
import MatchlistHeader from './MatchListHeader/MatchlistHeader'
import MatchListMain from './MatchListMain'
import MatchListMoblie from './MatchListMobile'
import { BrowserView, MobileView } from "react-device-detect"

export default class MatchList extends Component {
    render() {
        return (
            <div>
                <MatchlistHeader/>
                <BrowserView>
                    <MatchListMain/>
                </BrowserView>
                <MobileView>
                    <MatchListMoblie/>
                </MobileView>
                
            </div>
        )
    }
}
