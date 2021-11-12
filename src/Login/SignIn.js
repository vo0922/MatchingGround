import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Box } from '@mui/system';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { FormControl } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/backgroundimage/background4.jpg)',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 150,
    height:150,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// async function loginUser(credentials) {
//   return fetch('https://www.mecallapi.com/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then(data => data.json())
//  }

 const { naver } = window;


export default function Signin() {
  const classes = useStyles();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  //네이버 로그인 UI
  function NaverLogin() {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "MSl2rw4UPkjlxqHE2_qJ",
      callbackUrl: "http://localhost:3000/login/callback",
      isPopup: false,
      loginButton: {color: "green", type: 3, height:50} ,
      callbackHandle: true
    });
    naverLogin.init();
  }

  useEffect(() => {
    NaverLogin();
  });

  async function signin_check(signindata){
    fetch("http://localhost:3001/signin/check", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(signindata),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res[0].data_exist === 0){
        alert("존재하지 않는 아이디이거나 비밀번호가 틀렸습니다.")
        return;
        }
        else{
         signin(signindata.email);
        }
    });
  }

  async function signin(email){
    fetch("http://localhost:3001/myinfo" , {
      method : "post", // 통신방법
      headers : {
          "content-type" : "application/json",
      },
      body : JSON.stringify({
        email : email
      }),
    })
    .then((res)=>res.json())
    .then((res)=>{
        window.sessionStorage.setItem('id', email);
        window.sessionStorage.setItem('ground_manager', res[0].ground_manager);
        window.sessionStorage.setItem('team_manager', res[0].team_manager);
        window.sessionStorage.setItem('team_name', res[0].team_name);

        window.location.replace('/');
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const signindata ={
      email : data.get("email"),
      pw : data.get("password"),
    }

    if(signindata.email === "" || signindata.pw === ""){
      alert("아이디와 비밀번호를 입력하세요.")
      return;
    }

    signin_check(signindata)



    // const response = await loginUser({
    //   username,
    //   password
    // });
    // if ('accessToken' in response) {
    //   swal("Success", response.message, "success", {
    //     buttons: false,
    //     timer: 2000,
    //   })
    //   .then((value) => {
    //     localStorage.setItem('accessToken', response['accessToken']);
    //     localStorage.setItem('user', JSON.stringify(response['user']));
    //     window.location.href = "/profile";
    //   });
    // } else {
    //   swal("오류", response.message, "error");
    // }
  };



  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} md={7} className={classes.image} />
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src="/backgroundimage/logo2.png"/>
          <Typography component="h1" variant="h5">
            MatchingGround
          </Typography>
          <Box component="form" className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              align="center"
            >
              로그인
            </Button>
            <Link to="/signup" style={{float: "right"}}>회원가입</Link>
            <br/><br/><hr/>
          </Box>
          <div id="naverIdLogin" style={{textAlign: "center", marginTop: 20}}></div>
        </div>
      </Grid>
    </Grid>
  );
}