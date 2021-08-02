import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login'
import LoginCallBack from '../Login/Callback'
import Main from '../MainScreen/MainScreen'
import PrivateRoute from './PrivateRoute';
import PrivateRouteL from './PrivateRouteL';
import ManageGround from '../ManageGround/ManageGround';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRouteL exact path="/login" component={Login}/>
                <PrivateRouteL exact path="/login/callback" component={LoginCallBack}/>
                <PrivateRoute exact path="/" component={Main} />
                <Route exact path="/manageground" component={ManageGround}/>
            </Switch>
        </Router>
    );
}

export default Routes