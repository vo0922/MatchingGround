import React, { Component, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  photo: {
    height: 150,
    alignItems: "center",
  },
}));

function TeamFind({ history }) {
  const classes = useStyles();

  const [inputs, setinputs] = useState({
    city: "전체",
    team_class: "전체",
  });

  const { city, team_class } = inputs;

  const team_name = document.getElementById("team_name");

  const onChange = (e) => {
    const { value, name } = e.target;
    setinputs({
      ...inputs,
      [name]: value,
    });
  };

  const searchbutton = () => {
    fetch("http://localhost:3001/findteam/search", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        activity_area: inputs.city === "전체" ? "%" : inputs.city + "%",
        team_class: team_class === "전체" ? "%" : inputs.team_class,
        team_name: team_name.value === null ? "%" : "%" + team_name.value + "%",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setteamlist({
          list: json.map((data) => (
            <Grid item xs={12} md={4} key={data.team_no}>
              <Card>
                <CardMedia
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <img
                    className={classes.photo}
                    src={data.team_image}
                    alt="클럽 로고"
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    {data.team_name}
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    활동 지역 : {data.activity_area} <br />
                    희망 연령대 : {data.team_age} <br />클럽 수준 :{" "}
                    {data.team_class} <br />클럽 인원 : {data.team_count} <br />클럽
                    소개 : {data.team_introduce}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => getTeamDetail(data.team_name)}
                  >
                    클럽 상세페이지 버튼
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )),
        });
      });
  };

  // 클럽 상세정보 페이지
  const getTeamDetail = (teamkey,team_manage) => {
    history.push({
      pathname: "/findteam/teamdetail",
      state: {
        teamkey: teamkey,
        team_manage : team_manage,
      },
    });
  };

  const [teamlist, setteamlist] = useState({
    list: "",
  });

  const getteamlist = () => {
    fetch("http://localhost:3001/team/teamlist", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        setteamlist({
          list: json.map((data) => (
            <Grid item xs={12} md={4} key={data.team_no}>
              <Card>
                <CardMedia
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <img
                    className={classes.photo}
                    src={data.team_image}
                    alt="클럽 로고"
                  />
                </CardMedia>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    {data.team_name}
                  </Typography>
                  <Typography variant="body2" color="inherit">
                    활동 지역 : {data.activity_area} <br />
                    희망 연령대 : {data.team_age} <br />클럽 수준 :{" "}
                    {data.team_class} <br />클럽 인원 : {data.team_count} <br />클럽
                    소개 : {data.team_introduce}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => getTeamDetail(data.team_name, data.team_manage_name)}
                  >
                    클럽 상세페이지 버튼
                  </Button>                  
                </CardActions>
              </Card>
            </Grid>
          )),
        });
      });
  };

  useEffect(() => {
    getteamlist();
  }, []);

  return (
    <React.Fragment>
      <Container
        maxWidth="md"
        style={{ minHeight:"100vh", height:"100%", marginTop: 25 }}
      >
        <Typography component="div">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <h1>클럽 찾기</h1>
          </Grid>
          <hr />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ display: "flex", marginTop: 20}}
          >
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  시/도 선택
                </InputLabel>
                <Select
                  value={city}
                  name="city"
                  label="시/도"
                  style={{ minWidth: 150, textAlign: "center", margin:10 }}
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

              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">
                  클럽 수준
                </InputLabel>
                <Select
                  id="team_class"
                  name="team_class"
                  value={team_class}
                  onChange={onChange}
                  style={{ minWidth: 120, textAlign: "center", margin:10 }}
                >
                  <MenuItem value="전체">
                    <em>전체</em>
                  </MenuItem>
                  <MenuItem value={"아마추어"}>아마추어</MenuItem>
                  <MenuItem value={"세미프로"}>세미프로</MenuItem>
                  <MenuItem value={"프로"}>프로</MenuItem>
                  <MenuItem value={"월드클래스"}>월드클래스</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="team_name"
                name="team_name"
                style={{
                  width: 200,
                  margin:10,
                }}
              />
            <Button>
              <SearchIcon onClick={() => searchbutton()} />
            </Button>
            <Grid item xs={12}>
              <h1>클럽 리스트</h1>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {teamlist.list}
              </Grid>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(TeamFind);
