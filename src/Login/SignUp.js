import * as React from "react";
import { withRouter } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      MatchingGround {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp({history}) {
  const [gender, setgender] = React.useState("");
  const genderChange = (event) => {
    setgender(event.target.value);
  };

  const [position, setposition] = React.useState("");
  const positionChange = (event) => {
      setposition(event.target.value)
  }

  const [email, setemail] = React.useState("");
  const emailChange = (event) => {
      setemail(event.target.value);
      overlap = 0;
  }
  
  var overlap = 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if(data.get("user_name") === "" || data.get("password") === "" || data.get("password_confirm") === "" || data.get("user_name") === "" || data.get("birthyear") === ""){
        alert("* 칸은 필수입력입니다.")
        return;
    }
    else if(data.get("password").length < 4){
        alert("비밀번호는 4자 이상이여야 합니다.");
        return;
    }
    else if(overlap === 0){
        alert("이메일 중복확인을 해주세요.")
        return;
    }
    else if(data.get("password") !== data.get("password_confirm")){
        alert("비밀번호와 비밀번호확인이 다릅니다.")
        return;
    }

    // eslint-disable-next-line no-console
    const signupdata={
        user_name: data.get("user_name"),
        email: data.get("email"),
        pw: data.get("password"),
        birthyear: data.get("birthyear"),
        mobile : data.get("phonenum"),
        gender : gender,
        position: position,
        height: data.get("height"),
        introduce : data.get("introduce"),
    }
    console.log(signupdata);
    signup(signupdata);
  };

  function overlapCheck(){
    fetch("http://localhost:3001/signup/overlapcheck", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
          email : email
      }),
    })
      .then((res) => res.json())
      .then((res) => {
          
          if(res[0].cnt > 0){
              alert("이미 존재하는 이메일 입니다.")
          }
          else{
              alert("가입 가능한 이메일 입니다.")
              overlap = 1;
          }
    });
  }

  function signup(signupdata){
    fetch("http://localhost:3001/signup", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(signupdata),
    })
      .then((res) => res.json())
      .then((res) => {
          if(res.success === 1){
          alert("회원가입이 완료되었습니다.")
          history.push("/")
        }
        else{
            alert("회원가입중 오류가 발생했습니다.")
        }
    });
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          매칭그라운드 회원가입
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="user_name"
                required
                fullWidth
                id="user_name"
                label="이름"
                autoFocus
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="email"
                label="이메일주소"
                name="email"
                autoComplete="email"
                onChange={emailChange}
              />
            </Grid>
            <Grid item xs={4}>
                <Button onClick={overlapCheck} variant="contained" style={{width:"100%", height:"100%"}}>중복확인</Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password_confirm"
                label="비밀번호확인"
                type="password"
                id="password_confirm"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="number"
                id="birthyear"
                label="출생년도"
                name="birthyear"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                type="number"
                id="phonenum"
                label="전화번호 ex)01012345678"
                name="phonenum"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="genderlabel">성별</InputLabel>
                <Select
                  labelId="genderlabel"
                  id="gender"
                  value={gender}
                  label="성별"
                  onChange={genderChange}
                >
                  <MenuItem value="M">남자</MenuItem>
                  <MenuItem value="W">여자</MenuItem>
                </Select>                
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id="positionlabel">포지션</InputLabel>
                <Select
                  labelId="positionlabel"
                  id="position"
                  value={position}
                  label="성별"
                  onChange={positionChange}
                >
                  <MenuItem value="FW">FW</MenuItem>
                  <MenuItem value="MF">MF</MenuItem>
                  <MenuItem value="DF">DF</MenuItem>
                  <MenuItem value="GK">GK</MenuItem>
                </Select>                
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    type="number"
                    id="height"
                    label="키"
                    name="height"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    multiline
                    id="introduce"
                    rows={3}
                    label="자기소개"
                    name="introduce"
                />
            </Grid>
            
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="매칭그라운드에 개인정보 제공을 동의합니다."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                이미 아이디가 있으신가요?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
