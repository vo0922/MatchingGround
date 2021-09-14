import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

  const PrivateRouteNotTeam = ({component: Component, ...rest}) => { 
      return (
          <Route {...rest} render={props => (
            window.sessionStorage.getItem('team_name') === 'none'?
                <Component {...props}/>
                :<Redirect to="/team" />
          )} />
      );
  };

export default PrivateRouteNotTeam;