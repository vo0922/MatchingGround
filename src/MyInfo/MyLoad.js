import React, { Component, useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Autorenew } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#cfe8fc',
  },

  text: {
    textAlign : 'center',
  },
  image:{
    border: '1px solid black',
    borderRadius: 50,
    textAlign : 'center',
  },

  intro: {

  },

  button: {
    background: 'gray',
    borderRadius: 3,
    color: 'white',
    border: '1px solid black',
    height: 48,
    padding: '0 50px',
  },

}));

export default function SimpleContainer() {
  
  const classes = useStyles();

  const [info, setinfo] = useState({
    profile_image : '',
    user_name : '',
    birthyear : '',
    height : '',
    mobile : '',
    position : '',
    team_name : '',
    introduce : '',
    id : window.sessionStorage.getItem('id'),
});

//정보 API
const myinfomation = () => {
  fetch("http://localhost:3001/myinfo", {
      method : "post",
      headers : {
          "content-type" : "application/json",
      },
      body : JSON.stringify(info),
  })
  .then((res)=>res.json())
  .then((json)=>{
      setinfo({
          profile_image : json[0].profile_image,
          user_name : json[0].user_name,
          birthyear : json[0].birthyear,
          height : json[0].height,
          mobile : json[0].mobile,
          position : json[0].position,
          team_name : json[0].team_name,
          introduce : json[0].introduce,
          id : info.id,
      });
      console.log(json);            
  })
}

useEffect(() => {
  myinfomation();
}, [])

  return (
    <React.Fragment>
      <CssBaseline />      
      <Container>      
        <Typography component="div" className={classes.root}>
        <Container className={classes.root}>
        <div className={classes.image}>
          {info.profile_image}
        </div>
        </Container>
        <br/>
        <Container className={classes.text}>
        <div>
        이름 : {info.user_name} / 출생년도 : {info.birthyear}<br/>
        팀이름 : {info.team_name}<br/>
        <hr/>
        전화번호 : {info.mobile}<br/>
        키 : {info.height}<br/>
        포지션 : {info.position}<br/>
        </div>
        <hr/>자기소개<br/>
        </Container>
        
        <div>
          {info.introduce}
        </div>        
        </Typography>
        
        <Link to="/myinfo/modify">
          <button className={classes.button}>수정하기</button>
        </Link>

      </Container>
    </React.Fragment>
  );
}