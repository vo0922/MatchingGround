import React, { Component, useState, useEffect } from 'react';
import { withRouter,Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MainLogo from '../MainScreen/MainHeader/MainLogo';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

function TeamMake({history}) {

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

//오늘 날짜
  let today_date = new Date();
  let year = today_date.getFullYear();
  let month = today_date.getMonth() + 1;
  let day = today_date.getDate();
  let team_date = year + (month >= 10 ? "-" : "-0") + month + (day >= 10 ? "-" : "-0") + day;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if(e.target.team_image.files[0] == null){
        alert("사진을 등록해주세요");
        return;
      }
  
    const formData = new FormData();
  
    teammodify(formData);
  };

  let boxstyle={
    display: 'flex',
    flexWrap: 'wrap',
    '& > :not(style)': {
    m: 0.2,
  },
}

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

  }, [])


  return (

    <Container maxWidth="md">
          <MainLogo />
    <Typography component="div" style={{ backgroundColor: '#F3F3F3', height: '90vh', paddingTop: 20}} >    
      <Grid
          container
          direction="column"
      >
            <h1>팀 만들기</h1>
      </Grid>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        encType="multipart/form-data"
      >
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ marginTop: 30 }} direction="column">
        <Grid>
        <Box
          sx={boxstyle}>
          <Paper style={{width: 100,height:100,textAlign: 'center',lineHeight:"50px" }}><h5>클럽로고</h5></Paper>
          <Paper elevation={0} style={{width: 200,}} />
          <Paper elevation={0} style={{width: 400,lineHeight:"100px"}} ><input type="file" /></Paper>
        </Box>
        <Box
          sx={boxstyle}>
          <Paper style={{width: 100,textAlign: 'center'}}><h5>클럽명</h5></Paper>
          <Paper elevation={0} style={{width: 603, textAlign: 'center'}} ><TextField id="outlined-basic" label="클럽명" variant="outlined" style={{marginTop:4,width:500}}/></Paper>
        </Box>
        <Box
          sx={boxstyle}>
          <Paper style={{width: 100,textAlign: 'center'}}><h5>활동지역</h5></Paper>
          <Paper elevation={0} style={{width: 603, textAlign: 'center'}} >
        <Select
          value={age}
          onChange={handleChange}
          style={{marginTop:4,width:200}}
        >
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
        </Paper>
        </Box>
        <Box
          sx={boxstyle}>
          <Paper style={{width: 100,textAlign: 'center', height:200,lineHeight:"150px"}}><h5>클럽 소개말</h5></Paper>
          <Paper elevation={0} style={{width: 603, textAlign: 'center'}} >
          <TextField
          id="outlined-multiline-static"
          multiline
          rows={7}
          style={{width: 500, marginTop:4}}
        />
          </Paper>
        </Box>
        <Box
          sx={boxstyle}>
          <Paper style={{width: 100,textAlign: 'center'}}><h5>클럽 수준</h5></Paper>
          <Paper elevation={0} style={{width: 250, textAlign: 'center'}} >
          <Select
          value={age}
          onChange={handleChange}
          style={{marginTop:4,width:150}}
        >
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
          </Paper>
          <Paper style={{width: 100,textAlign: 'center'}}><h5>클럽 연령대</h5></Paper>
          <Paper elevation={0} style={{width: 247, textAlign: 'center'}} >
          <Select
          value={age}
          onChange={handleChange}
          style={{marginTop:4,width:150}}
        >
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
          </Paper>
        </Box>
        </Grid>
      <Grid>
        <Button
        endIcon={<SendIcon />}
        variant="contained"
        style={{width: 706,height: 60}}
        >
        클럽 생성하기
        </Button>
        </Grid>
      </Grid>
      </form>
      </Typography>
    </Container>
  );
}

export default withRouter(TeamMake);