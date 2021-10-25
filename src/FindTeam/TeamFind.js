import React, { Component, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import {
  Container,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  IconButton,
  Paper,
  Select,
  InputLabel,
  InputBase,
  TextField,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Teamlist from "./Teamlist";

function TeamFind({ history }) {
  const [inputs, setinputs] = useState({
    city: "",
    team_class: "",
  });

  const { city, team_class } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setinputs({
      ...inputs,
      [name]: value,
    });
  };
  /*
const [teaminfo, setteaminfo] = useState({
        team_class: '',
    })

    const findstart = () => {
    //시군구 검색api 요청
    fetch("http://localhost:3001/reservation/search", {
        method: "POST", // 통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ address: e.target.value }),
      })
        .then((res) => res.json())
        .then((res) => {
        });      
    
    // 팀 수준
      fetch("http://localhost:3001/team/findteam", {
        method: "POST", // 통신방법
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({teaminfo})
      })
      
    }
      useEffect({
        findstart();
        state: {
        teaminfo: teaminfo,
      },
      }, [])
*/

  return (
    <React.Fragment>
      <Container maxWidth="md" style={{ backgroundColor: "#F5F5F5", marginTop:10 }}>
        <Typography component="div" style={{ height: "100vh" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <h1>팀 찾기</h1>
          </Grid>
          <hr />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ display: "flex" }}
          >
            <Grid item xs={3}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  시/도 선택
                </InputLabel>
                <Select
                  value={city}
                  name="city"
                  label="시/도"
                  style={{ width: 200, textAlign: "center" }}
                  onChange={onChange}
                >
                  <MenuItem value="전체">
                    <em>전체</em>
                  </MenuItem>
                  <MenuItem value={"서울"}>서울</MenuItem>
                  <MenuItem value={"부산"}>부산</MenuItem>
                  <MenuItem value={"대구"}>대구</MenuItem>
                  <MenuItem value={"인천"}>인천</MenuItem>
                  <MenuItem value={"광주"}>광주</MenuItem>
                  <MenuItem value={"대전"}>대전</MenuItem>
                  <MenuItem value={"울산"}>울산</MenuItem>
                  <MenuItem value={"경기도"}>경기도</MenuItem>
                  <MenuItem value={"강원도"}>강원도</MenuItem>
                  <MenuItem value={"충청북도"}>충북</MenuItem>
                  <MenuItem value={"충청남도"}>충남</MenuItem>
                  <MenuItem value={"전라북도"}>전북</MenuItem>
                  <MenuItem value={"전라남도"}>전남</MenuItem>
                  <MenuItem value={"경상북도"}>경북</MenuItem>
                  <MenuItem value={"경상남도"}>경남</MenuItem>
                  <MenuItem value={"제주특별자치도"}>제주특별자치도</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  클럽 수준
                </InputLabel>
                <Select
                  id="team_class"
                  name="team_class"
                  value={team_class}
                  onChange={onChange}
                  style={{ width: 150, textAlign: "center" }}
                >
                  <MenuItem value={"아마추어"}>아마추어</MenuItem>
                  <MenuItem value={"세미프로"}>세미프로</MenuItem>
                  <MenuItem value={"프로"}>프로</MenuItem>
                  <MenuItem value={"월드클래스"}>월드클래스</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <TextField
                style={{
                  width: 380,
                }}
              />
            </Grid>
            <Button>
              <SearchIcon />
            </Button>
            <Grid item xs={12}>
              <h1>팀 리스트</h1>
            </Grid>
            <Grid item xs={12}>
              <Teamlist />
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(TeamFind);
