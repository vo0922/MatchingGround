import React, { Component, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Teammodify({ history, location }) {
  const [inputs, setinputs] = useState({
    team_class: "",
    team_age: "",
  });

  const { team_class, team_age } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setinputs({
      ...inputs,
      [name]: value,
    });
  };

  const [teaminfo, setteaminfo] = useState(location.state.teaminfo);

  //오늘 날짜
  let today_date = new Date();
  let year = today_date.getFullYear();
  let month = today_date.getMonth() + 1;
  let day = today_date.getDate();
  let team_date =
    year + (month >= 10 ? "-" : "-0") + month + (day >= 10 ? "-" : "-0") + day;  
  
  const [city, setcity] = useState("");
  const [area, setarea] = useState("");
  const [areamenu, setareamenu] = useState("");

  //활동지역 API

  const handleSelectcity = (e) => {
    setcity(e.target.value);
    setarea("");
    var address = "";
    if (e.target.value === "경상북도") {
      address = "경북";
    } else if (e.target.value === "경상남도") {
      address = "경남";
    } else if (e.target.value === "충청북도") {
      address = "충북";
    } else if (e.target.value === "충청남도") {
      address = "충남";
    } else if (e.target.value === "경기도") {
      address = "경기";
    } else if (e.target.value === "강원도") {
      address = "강원";
    } else if (e.target.value === "전라남도") {
      address = "전남";
    } else if (e.target.value === "전라북도") {
      address = "전북";
    } else if (e.target.value === "제주특별자치도") {
      address = "제주";
    } else {
      address = e.target.value;
    }
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
        setareamenu(
          res.map((data) => (
            <MenuItem
              key={data.properties.sig_kor_nm}
              value={data.properties.sig_kor_nm}
            >
              {data.properties.sig_kor_nm}
            </MenuItem>
          ))
        );
      });
  };

  const handleSelectarea = (e) => {
    setarea(e.target.value);
    var address = "";
    address = e.target.value;
  };

  //form API
  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.team_image.files[0] == null) {
      alert("사진을 등록해주세요");
      return;
    }
    
    const formData = new FormData();

    formData.append("team_name", teaminfo.team_name);
    formData.append("team_image", e.target.team_image.files[0]);
    formData.append("team_class", e.target.team_class.value);
    formData.append("team_introduce", e.target.team_introduce.value);
    formData.append(
      "activity_area",
      teaminfo.activity_area);
    formData.append("team_age", e.target.team_age.value);
    formData.append("team_manage_name", window.sessionStorage.getItem("id"));


    if(e.target.team_image.files[0] != null){
      teammodify_photo(formData);
    }
    else{
      teammodify_notphoto(formData);
    }   
  };

  let boxstyle = {
    display: "flex",
    flexWrap: "wrap",
    "& > :not(style)": {
      m: 0.2,
    },
  };

  //팀 수정 API
  function teammodify_photo(teaminfo) {
    fetch("http://localhost:3001/team/modify_photo", {
      method: "post",
      body: teaminfo,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        alert("클럽 수정이 완료되었습니다.");
        history.push("/team");
      });
  }

  function teammodify_notphoto(teaminfo) {
    fetch("http://localhost:3001/team/modify_notphoto", {
      method: "post",
      body: teaminfo,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.msg);
        alert("클럽 수정이 완료되었습니다.");
        history.push("/team");
      });
  }

  //팀 삭제 API
  function teamdelete() {
    console.log(teaminfo.team_name)
    fetch("http://localhost:3001/team/modify/delete", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ team_name : teaminfo.team_name }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        alert(data.msg);
        history.push('/');
        window.sessionStorage.setItem('team_name', 'none');
      });
  }

  //이미지 미리보기
  const [image, setimage] = useState({
    file: "",
    previewURL: "",
  });

  const handleFileOnChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setimage({
        file: file,
        previewURL: reader.result,
      });
    };
    if (file == null) {
      setimage({
        file: "",
      });
    } else reader.readAsDataURL(file);
  };

  let team_logo = null;
  var profileimage_url = teaminfo.team_image.substring(0,4);
  if (image.file !== "") {
    team_logo = (
      <img
        className="team_logo"
        src={image.previewURL}
        style={{ width: 80, height: 80 }}
      ></img>
    );
  } else {
    team_logo = (
      <img
        className="team_logo"
        src={teaminfo.team_image.substring(0,4) === "http" ? teaminfo.team_image : '../' + teaminfo.team_image}
        style={{ width: 80, height: 80 }}
      ></img>
    );
  }

  useEffect(() => {}, []);

  return (
    <React.Fragment>
    <Container maxWidth="md" style={{height:"100%", minHeight: "100vh", paddingTop: 20 }}>
      <MainLogo />
        <Grid container direction="column">
          <Typography variant="h4" style={{textAlign:"center"}}>팀 수정하기</Typography>
        </Grid>
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: 30 }}
            direction="column"
          >
            <Grid>
              <Box sx={boxstyle}>
                <Paper
                  style={{
                    width: 100,
                    height: 100,
                    textAlign: "center",
                    lineHeight: "50px",
                  }}
                >
                  <h5>클럽로고</h5>
                </Paper>
                <Paper
                  elevation={0}
                  style={{ width: 200, textAlign: "center" }}
                >
                  {team_logo}
                </Paper>
                <Paper
                  elevation={0}
                  style={{ width: 400, lineHeight: "100px" }}
                >
                  <input
                    accept="image/*"
                    type="file"
                    id="team_image"
                    name="team_image"
                    onChange={handleFileOnChange}
                  />
                </Paper>
              </Box>
              <Box sx={boxstyle}>
                <Paper style={{ width: 100, textAlign: "center" }}>
                  <h5>클럽명</h5>
                </Paper>
                <Paper
                  elevation={0}
                  style={{ width: 603, textAlign: "center" }}
                >
                  <TextField
                    id="team_name"
                    name="team_name"
                    label="클럽명"
                    variant="outlined"
                    value={teaminfo.team_name}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ marginTop: 4, width: 500 }}
                  />
                </Paper>
              </Box>
              <Box sx={boxstyle}>
                <Paper style={{ width: 100, textAlign: "center" }}>
                  <h5>활동지역</h5>
                </Paper>
                <Paper
                  elevation={0}
                  style={{ width: 603, textAlign: "center" }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <TextField
                    id="activity_area"
                    name="activity_area"
                    label="활동지역"
                    variant="outlined"
                    value={teaminfo.activity_area}
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ marginTop: 4, width: 500 }}
                  />                  
                  </Grid>
                </Paper>
              </Box>
              <Box sx={boxstyle}>
                <Paper
                  style={{
                    width: 100,
                    textAlign: "center",
                    height: 200,
                    lineHeight: "150px",
                  }}
                >
                  <h5>클럽 소개말</h5>
                </Paper>
                <Paper
                  elevation={0}
                  style={{ width: 603, textAlign: "center" }}
                >
                  <TextField
                    id="team_introduce"
                    name="team_introdcue"
                    multiline
                    defaultValue={teaminfo.team_introduce}
                    rows={7}
                    style={{ width: 500, marginTop: 4 }}
                  />
                </Paper>
              </Box>
              <Box sx={boxstyle}>
                <Paper style={{ width: 100, textAlign: "center" }}>
                  <h5>클럽 수준</h5>
                </Paper>
                <Paper
                  elevation={0}
                  style={{ width: 250, textAlign: "center" }}
                >
                  <Select
                    id="team_class"
                    name="team_class"
                    defaultValue={teaminfo.team_class}
                    onChange={onChange}
                    style={{ marginTop: 4, width: 150 }}
                  >
                    <MenuItem value={"아마추어"}>아마추어</MenuItem>
                    <MenuItem value={"세미프로"}>세미프로</MenuItem>
                    <MenuItem value={"프로"}>프로</MenuItem>
                    <MenuItem value={"월드클래스"}>월드클래스</MenuItem>
                  </Select>
                </Paper>
                <Paper style={{ width: 100, textAlign: "center" }}>
                  <h5>클럽 희망 연령대</h5>
                </Paper>
                <Paper
                  elevation={0}
                  style={{ width: 247, textAlign: "center" }}
                >
                  <Select
                    id="team_age"
                    name="team_age"
                    defaultValue={teaminfo.team_age}
                    onChange={onChange}
                    style={{ marginTop: 4, width: 150 }}
                  >
                    <MenuItem value={"10 ~ 20대"}>10 ~ 20대</MenuItem>
                    <MenuItem value={"20 ~ 30대"}>20 ~ 30대</MenuItem>
                    <MenuItem value={"30 ~ 40대"}>30 ~ 40대</MenuItem>
                    <MenuItem value={"40 ~ 50대"}>40 ~ 50대</MenuItem>
                    <MenuItem value={"50대 ~ ..."}>50대 ~ ...</MenuItem>
                  </Select>
                </Paper>
              </Box>
            </Grid>
            <Grid>
            <Button
                variant="contained"
                style={{ width: 100, height: 60, margin:5}}
                onClick={teamdelete}
              >
                클럽삭제
            </Button>
              <Button
                endIcon={<SendIcon />}
                variant="contained"
                style={{ width: 600, height: 60, margin:5 }}
                type="submit"
              >
                수정완료
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
    </React.Fragment>
  );
}

export default withRouter(Teammodify);
