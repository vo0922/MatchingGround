import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login'
import LoginCallBack from '../Login/Callback'
import Main from '../MainScreen/MainScreen'
import PrivateRoute from './PrivateRoute';
import PrivateRouteL from './PrivateRouteL';
<<<<<<< Updated upstream
import ManageGround from '../ManageGround/ManageGround';
=======
import ManageGround from '../ManageGround/NotGroundManager';
>>>>>>> Stashed changes

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRouteL exact path="/login" component={Login}/>
                <PrivateRouteL exact path="/login/callback" component={LoginCallBack}/>
<<<<<<< Updated upstream
                <PrivateRoute exact path="/" component={Main} />
                <Route exact path="/manageground" component={ManageGround}/>
=======
                <PrivateRoute exact path="/" component={Main}/>
                <PrivateRoute exact path="/manageground" component={ManageGround}/>
>>>>>>> Stashed changes
            </Switch>
        </Router>
    );
}

export default Routes