import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid, Typography, Button, Container } from "@material-ui/core";
import { withRouter } from "react-router";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@material-ui/core";

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

    if(e.target.profile_image.files[0] != null){
      mymodify_photo(formData);
    }
    else{
      mymodify_notphoto(formData);
    }   


  };

  // 수정하기 함수
  function mymodify_photo(myinfo) {
    fetch("http://smartit-16.iptime.org:3001/myinfo/modify_photo", {
      method: "post",
      body: myinfo,
    })
      .then((res) => res.json())
      .then((data) => {});
    history.push("/myinfo");
  }
  
  function mymodify_notphoto(myinfo) {
    fetch("http://smartit-16.iptime.org:3001/myinfo/modify_notphoto", {
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
        file: '',
      });
    } else reader.readAsDataURL(file);
  };

  let profile_preview = null;
  var profileimage_url = info.profile_image.substring(0,4);
  if (image.file !== "") {
    profile_preview = (
      <img
        className="profile_preview"
        src={image.previewURL}
        style={{ width: 256, height: 256 }}
      ></img>
    );
  } else {
    profile_preview = (
      <img
        className="profile_preview"
        src={info.profile_image.substring(0,4) === "http" ? info.profile_image : '../' + info.profile_image}
        style={{ width: 256, height: 256 }}
      ></img>
    );
  }

  useEffect(() => {}, []);

  return (
    <div>
      <Container maxWidth="md" style={{ backgroundColor: "white" }}>
        <Typography component="div" style={{ height: "100vh" }}>
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            encType="multipart/form-data"
          >
            <Grid container spacing={3} style={{ marginTop: 20 }}>
              <Grid
                item
                xs={12}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <div>{profile_preview}</div>
                <input
                  accept="image/*"
                  id="profile_image"
                  name="profile_image"
                  type="file"
                  onChange={handleFileOnChange}
                />
              </Grid>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <TextField
                    id="user_name"
                    label="이름"
                    variant="standard"
                    value={info.user_name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="birthyear"
                    label="출생년도"
                    variant="standard"
                    value={info.birthyear}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="team_name"
                    label="소속 팀 이름"
                    variant="standard"
                    value={info.team_name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                <FormControl variant="standard" style={{ width: 200 }}>
                    <InputLabel id="label">포지션</InputLabel>
                    <Select
                      labelId="gender"
                      id="gender"
                      name="gender"
                      label="성별"
                      value={info.gender}
                      onChange={handleonchange}
                    >
                      <MenuItem value={"M"}>남자</MenuItem>
                      <MenuItem value={"F"}>여자</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="height"
                    label="키"
                    defaultValue={info.height}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl variant="standard" style={{ width: 200 }}>
                    <InputLabel id="label">포지션</InputLabel>
                    <Select
                      labelId="position"
                      id="position"
                      name="position"
                      label="포지션"
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
              </Grid>
              <Grid item xs={12}>
                <Typography component="div" variant="h5">
                  자기소개
                </Typography>
              </Grid>
              <TextField
                id="introduce"
                multiline
                rows={4}
                defaultValue={info.introduce}
                variant="outlined"
                fullWidth
              />
              <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                item
                xs={12}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  수정완료
                </Button>
              </Grid>
            </Grid>
          </form>
        </Typography>
      </Container>
    </div>
  );
}

export default withRouter(Modify);
