import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

  const PrivateRouteNotGM = ({component: Component, ...rest}) => { 
      return (
          <Route {...rest} render={props => (
            window.sessionStorage.getItem('ground_manager') === '0' ?
                <Component {...props}/>
                :<Redirect to="/groundmanager" />
          )} />
      );
  };

export default PrivateRouteNotGM;