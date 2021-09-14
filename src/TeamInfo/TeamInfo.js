import React, { Component } from 'react';
import MainLogo from '../MainScreen/MainHeader/MainLogo';
import TeamLoad from './TeamLoad';
import TeamMake from './TeamMake';

class TeamInfo extends Component {
  render() {
    return (
      <div>
        <MainLogo/>
        <TeamLoad/>       
      </div>
    );
  }
}

export default TeamInfo;