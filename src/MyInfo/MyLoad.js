import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography, Button, Container, TextField } from '@material-ui/core';
import Mytotal from './Mytotal';
import MainLogo from '../MainScreen/MainHeader/MainLogo';
import { withRouter } from 'react-router';

const useStyles = makeStyles(() =>({
  
  title: {
    fontSize: 36,
    textAlign: 'center'
  },
  photo: {
    height: '75%',
    width: "75%",
  },
  data: {
    fontSize: 20,
  },
  title_introduce:{
    textAlign: 'center',
    fontSize: 28,
  },
  introduce: {
    fontSize: 20,
  },
  table: {
    minWidth: 650,
  },
}));

function MyModify() {
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
    email : window.sessionStorage.getItem('id'),
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
          email : info.email,
      });      
  })
}

useEffect(() => {
  myinfomation();
}, []);  

  const clickevent = (e) => {
    window.location.href = "/myinfo/modify"
  }

  return (
    <div>
      <MainLogo />
      <Container maxWidth="md" style={{ backgroundColor : '#FFFAFA'}}>
        
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title}>내 정보</Typography>
        </Grid>

        <Grid item xs={3}>
          <Avatar src={info.profile_image} className={classes.photo} />
        </Grid>

        <Grid item xs={5}>
          <Typography className={classes.data} color="textSecondary">
            이름 : {info.user_name} <br />
            포지션 : {info.position} <br />
            출생년도 : {info.birthyear} <br />
            키 : {info.height} <br />
            전화번호 : {info.mobile} <br />
            소속 팀 이름 : {info.team_name}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography className={classes.title_introduce}>자기소개</Typography>
          
          <TextField
          multiline
          fullWidth
          rows={4}
          defaultValue={info.introduce}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        </Grid>

        <Grid item xs={9}></Grid>

        <Grid item xs={3}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={clickevent}
          >
            수정하기
          </Button>
        </Grid>
        </Grid><br/>
        </Container>
        <Container maxWidth="md">
        <Grid item xs={12}>
          <Typography className={classes.introduce}>최근전적</Typography>
        </Grid>

        <Grid item xs={12}>
          <Mytotal />
        </Grid>
        </Container>
      
    </div>
  );
  }

  export default withRouter(MyModify);