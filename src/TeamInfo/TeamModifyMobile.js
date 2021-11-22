import React, { Component, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import "../font/font.css";
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material/";

function Teammodify({ history, location }) {
  const [inputs, setinputs] = useState({
    team_class: "",
    team_age: "",
  });

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
    fetch("http://smartit-16.iptime.org:3001/reservation/search", {
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
    
    const formData = new FormData();

    formData.append("team_name", teaminfo.team_name);
    formData.append("team_image", e.target.team_image.files[0]);
    formData.append("team_class", e.target.team_class.value);
    formData.append("team_introduce", e.target.team_introduce.value);
    formData.append("activity_area", teaminfo.activity_area);
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

  //클럽 수정 API
  function teammodify_photo(teaminfo) {
    fetch("http://smartit-16.iptime.org:3001/team/modify_photo", {
      method: "post",
      body: teaminfo,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        history.push("/team");
      });
  }

  function teammodify_notphoto(teaminfo) {
    fetch("http://smartit-16.iptime.org:3001/team/modify_notphoto", {
      method: "post",
      body: teaminfo,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        history.push("/team");
      });
  }

  //클럽 삭제 API
  function teamdelete() {
    fetch("http://smartit-16.iptime.org:3001/team/modify/delete", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ team_name : teaminfo.team_name }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        alert(data.msg);
        window.sessionStorage.setItem('team_name', 'none');
        window.location.replace('/');
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
        style={{ width: 160, height: 160 }}
      ></img>
    );
  } else {
    team_logo = (
      <img
        className="team_logo"
        src={teaminfo.team_image.substring(0,4) === "http" ? teaminfo.team_image : '../' + teaminfo.team_image}
        style={{ width: 160, height: 160 }}
      ></img>
    );
  }

  useEffect(() => {}, []);

  return (
    <React.Fragment>
    <Container
        maxWidth="md"
        style={{ minHeight: "100vh", height: "100%", paddingTop: 20 }}
      >
        <Grid container direction="column">
          <h1>클럽 만들기</h1>
        </Grid>
        <form
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            item
            xs
          >
            <Grid>
              <Typography style={{ width: 160, height: 160 }}>
                {team_logo}
              </Typography>
            </Grid>
            <Grid>
              <input
                accept="image/*"
                type="file"
                id="team_image"
                name="team_image"
                onChange={handleFileOnChange}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" alignItems="center" item xs>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >

                  <TableCell>
                    <TextField
                      id="team_name"
                      name="team_name"
                      label="클럽명"
                      variant="outlined"
                      value={teaminfo.team_name}
                    InputProps={{
                      readOnly: true,
                    }}
                      style={{ marginTop: 4, width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >

                  <TableCell>                    
                  <TextField
                      id="activity_area"
                      name="activity_area"
                      label="활동지역"
                      variant="outlined"
                      value={teaminfo.activity_area}
                    InputProps={{
                      readOnly: true,
                    }}
                      style={{ marginTop: 4, width: "100%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >

                  <TableCell>
                  <FormControl
                    style={{ marginTop: 4, width: "100%" }}>
                    <InputLabel id="team_class">클럽 수준</InputLabel>
                  <Select
                    id="team_class"
                    name="team_class"
                    labelId="team_class"
                    label="클럽 수준"
                    onChange={onChange}
                    defaultValue={teaminfo.team_class}
                  >
                    <em></em>
                    <MenuItem value={"아마추어"}>아마추어</MenuItem>
                    <MenuItem value={"세미프로"}>세미프로</MenuItem>
                    <MenuItem value={"프로"}>프로</MenuItem>
                    <MenuItem value={"월드클래스"}>월드클래스</MenuItem>
                  </Select>
                  </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >

                  <TableCell>
                  <FormControl
                    style={{ marginTop: 4, width: "100%" }}>
                    <InputLabel id="team_age">희망 연령대</InputLabel>
                  <Select
                    id="team_age"
                    name="team_age"
                    labelId="team_age"
                    label="희망 연령대"
                    defaultValue={teaminfo.team_age}
                    onChange={onChange}
                    style={{ marginTop: 4, width: "100%" }}
                  >
                    <MenuItem value={"10 ~ 20대"}>10 ~ 20대</MenuItem>
                    <MenuItem value={"20 ~ 30대"}>20 ~ 30대</MenuItem>
                    <MenuItem value={"30 ~ 40대"}>30 ~ 40대</MenuItem>
                    <MenuItem value={"40 ~ 50대"}>40 ~ 50대</MenuItem>
                    <MenuItem value={"50대 ~ ..."}>50대 ~ ...</MenuItem>
                  </Select>
                  </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >

                  <TableCell>
                  <TextField
                    id="team_introduce"
                    name="team_introdcue"
                    label="클럽 소개"
                    multiline
                    rows={7}
                    defaultValue={teaminfo.team_introduce}
                    style={{ width: "100%", marginTop: 4 }}
                  />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Grid item xs>
            <Button
                variant="contained"
                style={{ width:'30%', height: 60, margin:5 }}
                onClick={teamdelete}
              >
                클럽 삭제
              </Button>
              <Button
                variant="contained"
                style={{ width:'65%', height: 60 }}
                type="submit"
              >
                클럽 수정하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(Teammodify);
