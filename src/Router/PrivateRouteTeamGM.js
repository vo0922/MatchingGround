import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

  const PrivateRouteTeamGM = ({component: Component, ...rest}) => { 
      return (
        <Route {...rest} render={props => (
          window.sessionStorage.getItem('team_manager') === '1' ?
              <Component {...props}/>
              : <Redirect to="/team" />
        )} />
      );
  };

export default PrivateRouteTeamGM;