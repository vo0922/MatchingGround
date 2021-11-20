import React, { Component } from "react";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { BrowserView, MobileView } from "react-device-detect";
import MyModifybrowser from "./MyModifybrowser";
import MyModifyMobile from "./MyModifyMobile";

export default class MyModify extends Component {
  render() {
    return (
      <React.Fragment>
        <MainLogo />
        <BrowserView>
          <MyModifybrowser />
        </BrowserView>
        <MobileView>
          <MyModifyMobile />
        </MobileView>
      </React.Fragment>
    );
  }
}
