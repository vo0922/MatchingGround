import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { withRouter } from "react-router";
import MenuItem from "@mui/material/MenuItem";
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
} from "@mui/material/";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 36,
    textAlign: "center",
  },
  photo: {
    height: 256,
    width: 256,
  },
  data: {
    fontSize: 20,
  },
  title_introduce: {
    textAlign: "center",
    fontSize: 28,
  },
  introduce: {
    textAlign: "center",
    fontSize: 20,
  },
  table: {
    minWidth: 650,
  },
  container: {
    padding: 10,
  },
}));

function Modify({ history, location }) {
  const classes = useStyles();

  const [info, setinfo] = useState(location.state.info);

  const handleonchange = (e) => {
    const { value, name } = e.target;
    setinfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (info.profile_image == null) {
      alert("사진을 등록해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", e.target.profile_image.files[0]);
    formData.append("user_name", info.user_name);
    formData.append("birthyear", info.birthyear);
    formData.append("height", e.target.height.value);
    formData.append("gender", e.target.gender.value);
    formData.append("position", e.target.position.value);
    formData.append("team_name", info.team_name);
    formData.append("introduce", e.target.introduce.value);
    formData.append("email", window.sessionStorage.getItem("id"));

    if (e.target.profile_image.files[0] != null) {
      mymodify_photo(formData);
    } else {
      mymodify_notphoto(formData);
    }
  };

  // 수정하기 함수
  function mymodify_photo(myinfo) {
    fetch("http://localhost:3001/myinfo/modify_photo", {
      method: "post",
      body: myinfo,
    })
      .then((res) => res.json())
      .then((data) => {});
    history.push("/myinfo");
  }

  function mymodify_notphoto(myinfo) {
    fetch("http://localhost:3001/myinfo/modify_notphoto", {
      method: "post",
      body: myinfo,
    })
      .then((res) => res.json())
      .then((data) => {});
    history.push("/myinfo");
  }

  //이미지 핸들러

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
        ...image,
        file: "",
      });
    } else reader.readAsDataURL(file);
  };

  let profile_preview = null;
  var profileimage_url = info.profile_image.substring(0, 4);
  if (image.file !== "") {
    profile_preview = (
      <img
        className="profile_preview"
        src={image.previewURL}
        style={{ width: 160, height: 160 }}
      ></img>
    );
  } else {
    profile_preview = (
      <img
        className="profile_preview"
        src={
          info.profile_image.substring(0, 4) === "http"
            ? info.profile_image
            : "../" + info.profile_image
        }
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
          <h1>내정보 수정하기</h1>
        </Grid>
        <Typography component="div" style={{ height: "100vh" }}>
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
                {profile_preview}
              </Typography>
            </Grid>
            <Grid>
            <input
                  accept="image/*"
                  id="profile_image"
                  name="profile_image"
                  type="file"
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
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "30%", textAlign: "center" }}
                  >
                    <Typography component="div" variant="h6">
                     이름
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="user_name"
                      label="이름"
                      variant="outlined"
                      value={info.user_name}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ marginTop: 4, width: "28.5ch" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "30%", textAlign: "center" }}
                  >
                    <Typography component="div" variant="h6">
                     소속 팀 이름
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField                    
                      id="team_name"
                      label="소속 팀 이름"
                      variant="outlined"
                      value={info.team_name}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ marginTop: 4, width: "28.5ch" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "30%", textAlign: "center" }}
                  >
                    <Typography component="div" variant="h6">
                     출생년도
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField                    
                      id="birthyear"
                      label="출생년도"
                      variant="outlined"
                      value={info.birthyear}
                      InputProps={{
                        readOnly: true,
                      }}
                      style={{ marginTop: 4, width: "28.5ch" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "30%", textAlign: "center" }}
                  >
                    <Typography component="div" variant="h6">
                      성별
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Select
                    labelId="gender"
                    id="gender"
                    name="gender"
                    label="성별"
                    value={info.gender}
                    onChange={handleonchange}
                    style={{ marginTop: 4, width: '25ch' }}
                  >
                    <MenuItem value={"M"}>남자</MenuItem>
                    <MenuItem value={"F"}>여자</MenuItem>
                  </Select>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "30%", textAlign: "center" }}
                  >
                    <Typography component="div" variant="h6">
                      포지션
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <Select
                   id="position"
                   name="position"
                   label="포지션"
                   value={info.position}
                   onChange={handleonchange}
                    style={{ marginTop: 4, width: '25ch' }}
                  >
                    <MenuItem value={"FW"}>FW</MenuItem>
                      <MenuItem value={"MF"}>MF</MenuItem>
                      <MenuItem value={"DF"}>DF</MenuItem>
                      <MenuItem value={"GK"}>GK</MenuItem>
                  </Select>
                  </TableCell>
                </TableRow>                
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: "30%", textAlign: "center" }}
                  >
                    <Typography component="div" variant="h6">
                      자기소개
                    </Typography>
                  </TableCell>
                  <TableCell>
                  <TextField
                    id="introduce"
                    name="introduce"
                    multiline
                    variant="outlined"
                    defaultValue={info.introduce}
                    rows={4}
                    style={{ width: "28.5ch", marginTop: 4 }}
                  />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Grid>
              <Button
                variant="contained"
                fullWidth
                style={{ height: 60 }}
                type="submit"
              >
                내 정보 수정
              </Button>
            </Grid>
            </Grid>
          </form>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(Modify);
