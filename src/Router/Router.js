import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login'
import LoginCallBack from '../Login/Callback'
import Main from '../MainScreen/MainScreen'
import Reservation from '../ReservationGround/ReservationGrund'
import ReservationDetail from '../ReservationGround/ReservationDetail'
import PrivateRoute from './PrivateRoute';
import PrivateRouteL from './PrivateRouteL';
import PrivateRouteNotGM from './PrivateRouteNotGM';
import PrivateRouteGM from './PrivateRouteGM'
import ManageGround from '../ManageGround/ManageGround';
import GroundRegister from '../ManageGround/GroundRegister';
import NotGroundManager from '../ManageGround/NotGroundManager';
import Modals from '../ManageGround/Modals';
import GroundManager from '../ManageGround/GroundManager';
import GroundModify from '../ManageGround/GroundModify';
import ManageReservation from '../ManageGround/ManageReservation';
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
                <PrivateRoute exact path="/reservation" component={Reservation}/>
                <PrivateRoute exact path="/reservation/detail" component={ReservationDetail}/>

                <PrivateRouteGM exact path="/groundmanager" component={ManageGround}/>
                <PrivateRouteGM exact path="/groundmanager/modify" component={GroundModify}/>
                <PrivateRouteGM exact path="/groundmanager/managereservation" component={ManageReservation}/>
                <PrivateRouteNotGM exact path="/groundregister" component={GroundRegister}/>
                <PrivateRouteNotGM exact path="/notgroundmanager" component={NotGroundManager}/>

                <Route exact path="/modal" component={Modals}/>

                <PrivateRoute exact path="/myinfo" component={Myinfo}/>
                <PrivateRoute exact path="/myinfo/modify" component={MyModify}/>
                <PrivateRoute exact path="/teaminfo" component={TeamInfo}/>
                
            </Switch>
        </Router>
    );
}

export default Routes