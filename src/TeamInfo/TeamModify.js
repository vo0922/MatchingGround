import React, { Component } from "react";
import { BrowserView, MobileView } from "react-device-detect"
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import TeamModifyBrowser from "./TeamModifyBrowser";
import TeamModifyMobile from "./TeamModifyMobile";


export default class TeamModify extends Component {
    render() {
        return (
            <React.Fragment>     
              <MainLogo/>           
                <BrowserView>
                  <TeamModifyBrowser/>
                </BrowserView>
                <MobileView>
                  <TeamModifyMobile/>
                </MobileView>
            </React.Fragment>
        );
    }
}