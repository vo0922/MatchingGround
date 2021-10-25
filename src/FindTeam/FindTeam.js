import React, { Component } from "react";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import TeamFindTab from "./TeamFindTab";
import TeamFind from "./TeamFind";

class FindTeam extends Component {
  render() {
    return (
      <div>
        <MainLogo />
        <TeamFindTab />
        <TeamFind />
      </div>
    );
  }
}

export default FindTeam;
