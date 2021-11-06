import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import { withRouter } from "react-router-dom";
import {
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

function TeamApplyModal({ history, location }) {
  //체크박스 유무확인
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  // 오늘날짜
  let today_date = new Date();
  let year = today_date.getFullYear();

  // 내 정보 데이터 불러오기
  const [myinfo, setmyinfo] = useState({
    email: window.sessionStorage.getItem("id"),
    user_name: "",
    age: "",
    position: "",
    team_name: location.state.teamkey,
    introduce: "",
  });

  const myinfomation = () => {
    fetch("http://localhost:3001/myinfo", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(myinfo),
    })
      .then((res) => res.json())
      .then((json) => {
        setmyinfo({
          team_name: myinfo.team_name,
          user_name: json[0].user_name,
          age: year - json[0].birthyear + 1,
          position: json[0].position,
          email: myinfo.email,
          introduce: "",
        });

      });
  };


  // 가입신청버튼
  const [applydata, setapplydata] = useState({
    introduce: '',
  });

  const applybutton = () => {
    fetch("http://localhost:3001/findteam/applybutton", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(myinfo),
    })
      .then((res) => res.json())
      .then((json) => {
        alert("가입 신청이 완료되었습니다.");
        history.push("/");
      });
  };

  //자기소개 글 벨류
  const onChange = (e) => {
    setmyinfo({
      ...myinfo,
      introduce: e.target.value,
    });
  };

  useEffect(() => {
    myinfomation();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            가입 신청 페이지
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="user_name"
            label="이름"
            value={myinfo.user_name}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="email"
            label="이메일"
            value={myinfo.email}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="age"
            label="나이"
            value={myinfo.age}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="position"
            label="포지션"
            value={myinfo.position}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            자기소개
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            fullWidth
            variant="outlined"
            placeholder="자기소개 적는곳 왜 테두리가 안보이니"
            value={myinfo.introduce}
            onChange={onChange}
            helperText="간략하게 1줄 30자 이내로"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="내 정보를 팀장에게 제공하는 것을 동의합니다."
          />
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid>
            {checked === true ? (
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={applybutton}
              >
                가입신청하기
              </Button>
            ) : (
              <Button variant="outlined" color="primary" size="large" disabled>
                가입신청하기
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default withRouter(TeamApplyModal);
