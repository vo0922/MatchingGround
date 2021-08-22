import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login'
import LoginCallBack from '../Login/Callback'
import Main from '../MainScreen/MainScreen'
import PrivateRoute from './PrivateRoute';
import PrivateRouteL from './PrivateRouteL';
import Myinfo from '../MyInfo/MyInfo';
import MyModify from '../MyInfo/MyModify'
import TeamInfo from '../TeamInfo/TeamInfo';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRouteL exact path="/login" component={Login}/>
                <PrivateRouteL exact path="/login/callback" component={LoginCallBack}/>
                <PrivateRoute exact path="/" component={Main}/>
                <PrivateRoute exact path="/myinfo" component={Myinfo}/>
                <PrivateRoute exact path="/myinfo/modify" component={MyModify}/>
                <PrivateRoute exact path="/teaminfo" component={TeamInfo}/>
                
            </Switch>
        </Router>
    );
}

export default Routes