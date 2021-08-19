import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

  const PrivateRouteGM = ({component: Component, ...rest}) => { 
      return (
        <Route {...rest} render={props => (
          window.sessionStorage.getItem('ground_manager') === '1' ?
              <Component {...props}/>
              : <Redirect to="/notgroundmanager" />
        )} />
      );
  };

export default PrivateRouteGM;