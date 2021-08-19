import React, {useState, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

  const PrivateRouteNotGM = ({component: Component, ...rest}) => { 
    const [notgroundmanager, setNotGroundmanager] = useState({
      email:window.sessionStorage.getItem('id'),
      ground_manager : 0,
    });
    
    function getGroundManager(){
      fetch("http://localhost:3001/router/groundmanager", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(notgroundmanager),
      })
        .then((res) => res.json())
        .then((json) => {
          setNotGroundmanager({
            ground_manager : json[0].ground_manager});
        });
    }

      useEffect(() => {
        getGroundManager();
        console.log(notgroundmanager.ground_manager);
      }, [])

      return (
          <Route {...rest} render={props => (
            !notgroundmanager.ground_manager ?
                <Component {...props}/>
                :<Redirect to="/manageground" />
          )} />
      );
  };

export default PrivateRouteNotGM;