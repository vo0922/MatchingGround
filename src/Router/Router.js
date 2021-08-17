import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login'
import LoginCallBack from '../Login/Callback'
import Main from '../MainScreen/MainScreen'
import PrivateRoute from './PrivateRoute';
import PrivateRouteL from './PrivateRouteL';
import PrivateRouteGM from './PrivateRouteGM';
import ManageGround from '../ManageGround/ManageGround';
import GroundRegister from '../ManageGround/GroundRegister';
import NotGroundManager from '../ManageGround/NotGroundManager';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRouteL exact path="/login" component={Login}/>
                <PrivateRouteL exact path="/login/callback" component={LoginCallBack}/>
                <PrivateRoute exact path="/" component={Main}/>

                <PrivateRouteGM exact path="/manageground" component={ManageGround}/>
                <PrivateRoute exact path="/groundregister" component={GroundRegister}/>
                <PrivateRoute exact path="/notgroundmanager" component={NotGroundManager}/>
            </Switch>
        </Router>
    );
}

export default Routes