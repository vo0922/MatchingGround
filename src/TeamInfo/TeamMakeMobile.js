import React, { Component, useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { Container } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material/";

function TeamMake({ history }) {
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

  const team_name = document.getElementById("team_name");
  const team_introduce = document.getElementById("team_introduce");

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

    switch ("") {
      case team_name.value:
        alert("클럽명을 선택해주세요.");
        return;
      case city:
        alert("활동지역을 작성해주세요.");
        return;
      case area:
        alert("활동도시 작성해주세요.");
        return;
      case team_introduce.value:
        alert("클럽 소개글을 작성해주세요.");
        return;
      case team_class:
        alert("클럽 수준을 선택해주세요.");
        return;
      case team_age:
        alert("클럽 희망 연령대를 선택해주세요.");
        return;
    }

    const formData = new FormData();

    formData.append("team_name", e.target.team_name.value);
    formData.append("team_image", e.target.team_image.files[0]);
    formData.append("team_date", team_date);
    formData.append("team_class", e.target.team_class.value);
    formData.append("team_introduce", e.target.team_introduce.value);
    formData.append(
      "activity_area",
      e.target.area.value + " " + e.target.areamenu.value
    );
    formData.append("team_age", e.target.team_age.value);
    formData.append("team_manage_name", window.sessionStorage.getItem("id"));

    teammodify(formData);
  };

  let boxstyle = {
    display: "flex",
    flexWrap: "wrap",
    "& > :not(style)": {
      m: 0.2,
    },
  };

  //클럽 생성 API
  function teammodify(teaminfo) {
    fetch("http://localhost:3001/team/team_make", {
      method: "post",
      body: teaminfo,
    })
      .then((res) => res.json())
      .then((data) => {
        window.sessionStorage.setItem("team_manager", data.success);
        window.sessionStorage.setItem("team_name", data.team_name);
        alert("클럽 생성이 완료되었습니다.");
        history.push("/team");
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
  if (image.file !== "") {
    team_logo = (
      <img
        className="team_logo"
        src={image.previewURL}
        style={{ width: 160, height: 160 }}
      ></img>
    );
  }

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <MainLogo />
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
                      style={{ marginTop: 4, width: '100%' }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                  <Grid container>
                  <Grid item xs>
                  <FormControl fullWidth>
                      <InputLabel id="inputlabel1">시/도 선택</InputLabel>
                    <Select
                      id="area"
                      name="area"
                      labelId="inputlabel1"
                      label="시/도 선택"
                      value={city}
                      onChange={handleSelectcity}
                      style={{ margin: 4 }}
                    >
                      <MenuItem value={"서울"}>서울</MenuItem>
                      <MenuItem value={"부산"}>부산</MenuItem>
                      <MenuItem value={"대구"}>대구</MenuItem>
                      <MenuItem value={"인천"}>인천</MenuItem>
                      <MenuItem value={"광주"}>광주</MenuItem>
                      <MenuItem value={"대전"}>대전</MenuItem>
                      <MenuItem value={"울산"}>울산</MenuItem>
                      <MenuItem value={"세종"}>세종</MenuItem>
                      <MenuItem value={"경기"}>경기</MenuItem>
                      <MenuItem value={"강원"}>강원</MenuItem>
                      <MenuItem value={"충청북도"}>충북</MenuItem>
                      <MenuItem value={"충청남도"}>충남</MenuItem>
                      <MenuItem value={"전라북도"}>전북</MenuItem>
                      <MenuItem value={"전라남도"}>전남</MenuItem>
                      <MenuItem value={"경상북도"}>경북</MenuItem>
                      <MenuItem value={"경상남도"}>경남</MenuItem>
                      <MenuItem value={"제주"}>제주</MenuItem>
                    </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs>
                    <FormControl fullWidth>
                    <InputLabel id="inputlabel2">구/군/구 선택</InputLabel>
                    <Select
                      id="areamenu"
                      name="areamenu"
                      labelId="inputlabel2"
                      label="구/군/구 선택"
                      value={area}
                      onChange={handleSelectarea}
                      style={{ margin: 4 }}
                    >
                      {areamenu}
                    </Select>
                    </FormControl>
                    </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id="inputlabel">클럽 수준</InputLabel>
                      <Select
                        id="team_class"
                        name="team_class"
                        labelId="inputlabel"
                        label="클럽 수준"
                        value={team_class}
                        onChange={onChange}
                        style={{ marginTop: 4, width: "100%" }}
                      >
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
                  <FormControl fullWidth>
                      <InputLabel id="inputlabel">희망 연령대</InputLabel>
                    <Select
                      id="team_age"
                      name="team_age"
                      labelId="inputlabel"
                      label="희망 연령대"
                      value={team_age}
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
                      placeholder="클럽 소개글을 적어주세요."
                      multiline
                      rows={7}
                      style={{ width: "100%", marginTop: 4 }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Grid>
              <Button
                endIcon={<SendIcon />}
                variant="contained"
                style={{ width: "100%", height: 60 }}
                type="submit"
              >
                클럽 생성하기
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(TeamMake);
