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
import MyInfo from '../MyInfo/MyInfo';
import MyModify from '../MyInfo/MyModify';
import TeamInfo from '../TeamInfo/TeamInfo';
import TeamNot from '../TeamInfo/TeamNot';
import PrivateRouteTeam from './PrivateRouteTeam';
import PrivateRouteNotTeam from './PrivateRouteNotTeam';
import TeamMake from '../TeamInfo/TeamMake';
import MatchList from '../MatchList/MatchList';
import Notice from '../Notice/Notice'
import PrivateRouteTeamGM from './PrivateRouteTeamGM';
import TeamModify from '../TeamInfo/TeamModify';
import Matchinfo from '../MatchInfo/MatchInfo'
import PastReservation from '../PastReservation/PastReservation';
import FindTeam from '../FindTeam/FindTeam';
import TeamDetail from '../FindTeam/TeamDetail';
import SignUp from '../Login/SignUp';
import TeamApplyMobile from '../TeamInfo/TeamApplyMobile';
import TeamMemberMobile from '../TeamInfo/TeamMemberMobile';
import TeamMobileApply from '../FindTeam/TeamMobileApply';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRouteL exact path="/login" component={Login}/>
                <PrivateRouteL exact path="/login/callback" component={LoginCallBack}/>
                <PrivateRouteL exact path="/signup" component={SignUp}/>
                <PrivateRoute exact path="/" component={Main}/>

                <PrivateRoute exact path="/reservation" component={Reservation}/>
                <PrivateRoute exact path="/reservation/detail" component={ReservationDetail}/>
                <PrivateRoute exact path="/notice" component={Notice}/>
                <PrivateRoute exact path="/myinfo" component={MyInfo}/>
                <PrivateRoute exact path="/myinfo/modify" component={MyModify}/>
                <PrivateRoute exact path="/matchinfo" component={Matchinfo}/>
                <PrivateRoute exact path="/pastreservation" component={PastReservation}/>

                <PrivateRouteGM exact path="/groundmanager" component={ManageGround}/>
                <PrivateRouteGM exact path="/groundmanager/modify" component={GroundModify}/>
                <PrivateRouteGM exact path="/groundmanager/managereservation" component={ManageReservation}/>
                <PrivateRouteNotGM exact path="/groundregister" component={GroundRegister}/>
                <PrivateRouteNotGM exact path="/notgroundmanager" component={NotGroundManager}/>

                <Route exact path="/modal" component={Modals}/>


                <PrivateRouteTeam exact path="/team" component={TeamInfo}/>
                <PrivateRouteNotTeam exact path="/teamnot" component={TeamNot}/>
                <PrivateRouteNotTeam exact path="/teammake" component={TeamMake}/>
                <PrivateRouteTeam exact path="/team/apply" component={TeamApplyMobile}/>
                <PrivateRouteTeam exact path="/team/member" component={TeamMemberMobile}/>                
                <PrivateRoute exact path="/findteam" component={FindTeam}/>
                <PrivateRoute exact path="/findteam/teamdetail" component={TeamDetail}/>
                <PrivateRouteNotTeam exact path="/findteam/teamdetail/apply" component={TeamMobileApply}/>

                <PrivateRouteTeamGM exact path="/team/modify" component={TeamModify}/>

                <PrivateRoute exact path="/matchlist" component={MatchList}/>                
            </Switch>
        </Router>
    );
}

export default Routes