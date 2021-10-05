import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { withRouter, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  photo: {
    height: '75%',
    width: "75%",
  },

  data: {
    fontSize: 20,
  },
}));

function TeamLoad({history}) {
  
  const classes = useStyles();
/*
const [teaminfo, setteaminfo] = useState({
  team_name: '',
  team_image: '',
  team_count: '',
  win: '',
  lose: '',
  team_date: '',
  team_class: '',
  user_email: window.sessionStorage.getItem("id"),
});


const getTeamdata = () => {
  fetch("http://localhost:3001/team/info", {
      method : "post",
      headers : {
          "content-type" : "application/json",
      },
      body : JSON.stringify(teaminfo),
  })
  .then((res)=>res.json())
  .then((json)=>{
    setteaminfo({
      team_name : json[0].team_name,
      team_image : json[0].team_image,
      team_count : json[0].team_count,
      win : json[0].win,
      lose : json[0].lose,
      team_date : json[0].team_date,
      team_class : json[0].team_class,
      user_email : teaminfo.user_email,
      });
      console.log(json);            
  })
}

useEffect(() => {
    getTeamdata();
}, [])
*/
return (
  <Container width="md">
    <Typography component="div" variant="h5">
      내 팀 정보
    </Typography>
    <Container
      style={{ backgroundColor: "#cfe8fc", padding: "10%" }}
    >
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={5}>
      <Typography className={classes.data} color="textSecondary">
        클럽명 : "기린 축구팀" <br/>
        클럽장 : "OOO" <br/>
        클럽 생성일 : 0000.00.00 <br/>
        활동지역 : 대구광역시 <br/>
        클럽수준 : 중 <br/>
        클럽 연령대 : 20대
        최근전적 : 1승 1무 0패
      </Typography>
      </Grid>
      
    </Container>
  </Container>
);
}

export default withRouter(TeamLoad);