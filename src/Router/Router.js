import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login'
import LoginCallBack from '../Login/Callback'
import Main from '../MainScreen/MainScreen'
import Reservation from '../ReservationGround/ReservationGrund'
import ReservationDetail from '../ReservationGround/ReservationDetail'
import PrivateRoute from './PrivateRoute';
import PrivateRouteL from './PrivateRouteL';
import PrivateRouteGM from './PrivateRouteGM';
import ManageGround from '../ManageGround/ManageGround';
import GroundRegister from '../ManageGround/GroundRegister';
import NotGroundManager from '../ManageGround/NotGroundManager';
import Modals from '../ManageGround/Modals';


const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRouteL exact path="/login" component={Login}/>
                <PrivateRouteL exact path="/login/callback" component={LoginCallBack}/>
                <PrivateRoute exact path="/" component={Main}/>
                <PrivateRoute exact path="/reservation" component={Reservation}/>
                <PrivateRoute exact path="/reservation/detail" component={ReservationDetail}/>

                <PrivateRouteGM exact path="/manageground" component={ManageGround}/>
                <PrivateRoute exact path="/groundregister" component={GroundRegister}/>
                <PrivateRoute exact path="/notgroundmanager" component={NotGroundManager}/>

                <Route exact path="/modal" component={Modals}/>

                
            </Switch>
        </Router>
    );
}

export default Routes