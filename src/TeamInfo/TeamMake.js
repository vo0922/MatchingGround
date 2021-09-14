import React, { Component, useState, useEffect } from 'react';
import { withRouter,Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '@material-ui/core/Modal';
import MainLogo from '../MainScreen/MainHeader/MainLogo';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
formControl: {
    minWidth: 120,
  },
});


function TeamMake({history}) {
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

const [teaminfo, setteaminfo] = useState({
  team_name : '',
});


  // 클럽 수준 핸들러
  const [inputs, setinputs] = useState({
    team_class: '',
    team_age: '',
  }); 

  const handleonchange = (e) => {

    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // 중복확인 핸들러
  const [team_check, setteam_check] = useState({
    team_check: '',
    team_name: window.sessionStorage.getItem('team_name'),
  })
  const handleoncheck = (e) => {
    
  }


  //오늘 날짜

  let today_date = new Date();
    let year = today_date.getFullYear();
    let month = today_date.getMonth() + 1;
    let day = today_date.getDate();
    let team_date =
      year +
      (month >= 10 ? "-" : "-0") +
      month +
      (day >= 10 ? "-" : "-0") +
      day;


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
      console.log(json);            
  })
}

// 팀 이름 중복확인 API
const teamcheck = () => {
  fetch("http://localhost:3001/teamcheck", {
      method : "post",
      headers : {
          "content-type" : "application/json",
      },
      body : JSON.stringify(team_check),
  })
  .then((res)=>res.json())
  .then((json)=>{
      console.log(json);            
  })
}

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if(e.target.team_image.files[0] == null){
        alert("사진을 등록해주세요");
        return;
      }
  
    const formData = new FormData();
    formData.append("team_image", e.target.team_image.files[0]);
    formData.append("team_name", e.target.team_name.value);
    formData.append("team_manage_name", e.target.team_manage_name.value);
    formData.append("activity_area", e.target.activity_area.value);
    formData.append("team_class", e.target.team_class.value);  
    formData.append("team_age", e.target.team_age.value);
    formData.append("team_date", e.target.team_date.value);
    formData.append("introduce", e.target.introduce.value);
    formData.append("user_email", window.sessionStorage.getItem("id"));  
  
    teammodify(formData);
  };

  //팀 생성 API
  function teammodify (teaminfo) {
  
    fetch("http://localhost:3001/team/team_make", {
          method : "post",
          body : teaminfo,
      })
      .then((res)=>res.json())
      .then((data)=>{    
        console.log(data.msg);
      });
      alert("클럽 생성이 완료되었습니다.")
      
  }


  useEffect(() => {
    myinfomation();
  }, [])


  return (
    <Container maxWidth="md" style={{}}>
      <MainLogo />
      <Typography component="div" variant="h5">
        클럽 생성하기
      </Typography>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={3}>
            <TextField
              id="team_name"
              name="team_name"
              label="클럽명"
              placeholder="클럽명"
              margin="normal"
              //onChange={handleonchange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              //onClick={check}
              variant="outlined"
              color="primary"
              size="large"
            >
              중복확인
            </Button>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={3}>
            <TextField
              id="activity_area"
              label="활동지역"
              placeholder="ex)대구광역시 동구"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" color="primary" size="large">
              주소찾기
            </Button>
          </Grid>
        </Grid>
        <Typography component="div" variant="h5">
          <hr />
          클럽 로고
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>
            <input
              accept="image/*"
              id="team_image"
              name="team_image"
              type="file"
            />
          </Typography>
        </Grid>
        <Typography component="div" variant="h5">
          <hr />
          클럽 소개
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={5}>
            <TextField
              required
              id="introduce"
              label="소개 내용"
              placeholder="팀 소개를 위해 작성"
              variant="outlined"
              multiline
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button type="submit" variant="contained" color="primary">
            만들기
          </Button>
        </Grid>
      </form>
    </Container>
  );
}

export default withRouter(TeamMake);