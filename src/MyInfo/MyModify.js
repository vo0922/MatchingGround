import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography, Button, Container } from '@material-ui/core';
import Mytotal from './Mytotal';
import MainLogo from '../MainScreen/MainHeader/MainLogo';
import MainTab from '../MainScreen/MainHeader/MainTab';
import { withRouter } from 'react-router';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

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
    textAlign: 'center',
    fontSize: 20,
  },
  table: {
    minWidth: 650,
  },
  container: {
    padding: 10,
  }
}));

function Modify({history}) {
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
      console.log(json);            
  })
}



const handleonchange = (e) => {
  setinfo({
    ...info,
    position: e.target.value,
  })
}

const handleSubmit = (e) => {
  e.preventDefault();

    if(info.profile_image == null){
      alert("사진을 등록해주세요");
      return;
    }

  const formData = new FormData();

  if(e.target.profile_image.files[0] == null){
    formData.append("profile_image", info.profile_image);
  } else{
    formData.append("profile_image", e.target.profile_image.files[0]);
  }  
  formData.append("user_name", info.user_name);
  formData.append("birthyear", info.birthyear);
  formData.append("height", e.target.height.value);
  formData.append("mobile", e.target.mobile.value);  
  formData.append("position", e.target.position.value);  
  formData.append("team_name", info.team_name);
  formData.append("introduce", e.target.introduce.value);
  formData.append("email", window.sessionStorage.getItem("id"));  

  mymodify(formData);
};

//이미지 핸들러


//수정API
function mymodify (myinfo) {
  fetch("http://localhost:3001/myinfo/modify", {
        method : "post",
        body : myinfo,
    })
    .then((res)=>res.json())
    .then((data)=>{    
    });    
    history.push("/myinfo");
}

//이미지API
function myimage (myinfo) {
  
  fetch("http://localhost:3001/myinfo/modify/image", {
        method : "post",
        body : myinfo,
    })
    .then((res)=>res.json())
    .then((data)=>{
    });
}

useEffect(() => {
  myinfomation();
}, []);  


  return (
    <div>
      <MainLogo />
      <MainTab />
      <Container className={classes.container} maxWidth="md">
        <Grid item xs={12}>
          <Typography className={classes.title}>내 정보</Typography>
        </Grid>
        <br />
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
        >
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Avatar src={info.profile_image} className={classes.photo} />
              <br />
              <input
                accept="image/*"
                id="profile_image"
                name="profile_image"
                type="file"
              />
            </Grid>

            <Grid item xs={5}>
              <Typography className={classes.data} color="textSecondary">
                이름 : {info.user_name}
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography className={classes.data} color="textSecondary">
                  포지션 : &nbsp;
                </Typography>
                <FormControl>
                  <Select
                    labelId="position"
                    id="position"
                    name="position"
                    fullWidth
                    value={info.position}
                    onChange={handleonchange}
                  >
                    <MenuItem value={"FW"}>FW</MenuItem>
                    <MenuItem value={"MF"}>MF</MenuItem>
                    <MenuItem value={"DF"}>DF</MenuItem>
                    <MenuItem value={"GK"}>GK</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Typography className={classes.data} color="textSecondary">
                <br />
                생년월일 : {info.birthyear} <br />키 : &nbsp;
                <input
                  type="text"
                  id="height"
                  defaultValue={info.height}
                ></input>{" "}
                <br />
                전화번호 :{" "}
                <input
                  type=""
                  id="mobile"
                  defaultValue={info.mobile}
                ></input>{" "}
                <br />
                소속 팀 이름 : {info.team_name}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography className={classes.title_introduce}>
                자기소개
              </Typography>
              <Typography className={classes.introduce} color="textSecondary">
                <input
                  type="textarea"
                  id="introduce"
                  defaultValue={info.introduce}
                />
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                size="large"
              >
                수정완료
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title_introduce}>
                최근전적
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Mytotal />
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
  }

  export default withRouter(Modify);