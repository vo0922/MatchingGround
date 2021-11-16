import React, { Component } from "react";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { BrowserView, MobileView } from "react-device-detect"
import TeamMakeBrowser from "./TeamMakeBrowser";
import TeamMakeMobile from "./TeamMakeMobile";


export default class TeamMake extends Component {
    render() {
        return (
            <React.Fragment>                
                <BrowserView>
                    <TeamMakeBrowser/>
                </BrowserView>
                <MobileView>
                    <TeamMakeMobile/>
                </MobileView>
            </React.Fragment>
        );
    }
}