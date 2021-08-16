import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { FormControlLabel, Grid, Modal, Button, TextField, Container, Typography, CssBaseline, Checkbox } from "@material-ui/core";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import DaumPostcode from "react-daum-postcode";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {},
  textField2: {},

  Button: {
    margin: 5,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
  },
  postCodeStyle: {
    display: "block",
    position: "absolute",
    top: "50%",
    width: "400px",
    height: "500px",
    padding: "7px",
  },
  grid: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  container: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

// 주소찾기창 스타일적용
const postCodeStyle = {
  display: "block",
  position: "absolute",
  top: "50%",
  width: "400px",
  height: "500px",
  padding: "7px",
};

function GroundRegister({history}) {
  const classes = useStyles();

  // 주소 modal 열기, 닫기 state
  const [open, setOpen] = React.useState(false);
  // 주소 modal 열기
  const handleOpen = () => {
    setOpen(true);
  };
  // 주소 modal 닫기
  const handleClose = () => {
    setOpen(false);
  };
  // 다음 도로명 주소 찾기 로직
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const [IsPostOpen, setIsPostOpen] = useState(true);
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
    handleClose();
  };
  const modalbody = (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
    </div>
  );

  // 폼 컨트롤
  const handleSubmit = (e) => {
    e.preventDefault();

    if(e.target.photo.files[0] == null){
      alert("사진을 등록해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("ground_name", e.target.ground_name.value);
    formData.append("ground_count", e.target.ground_count.value);
    formData.append("address", e.target.address2.value + e.target.address3.value);
    formData.append("phonenum", e.target.phonenum.value);
    formData.append("manager_id", window.sessionStorage.getItem("id"));
    formData.append("photo", e.target.photo.files[0]);
    formData.append("price", e.target.price.value);
    formData.append("parking_lot", e.target.parking_lot.checked);
    formData.append("shower_room", e.target.shower_room.checked);
    formData.append("foot_rent", e.target.foot_rent.checked);
    formData.append("wifi", e.target.wifi.checked);
    formData.append("ball_rent", e.target.ball_rent.checked);
    formData.append("uniform_rent", e.target.uniform_rent.checked);

    groundRegister(formData);
  };

  function groundRegister(groundinfo) {
    fetch("http://localhost:3001/ground/info/register", {
      method: "post",
      body: groundinfo,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg)
        history.push('/manageground');
      });
  }

  return (
    <div>
      <React.Fragment>
        <MainLogo />
        <CssBaseline />
        <Container
          maxWidth="md"
          className={classes.container}
          style={{ backgroundColor: "#F3F3F3" }}
        >
          <Typography component="div" style={{ height: "100vh" }}>
            <Typography
              component="h4"
              variant="h4"
              style={{ textAlign: "center", paddingTop: 20 }}
            >
              경기장 등록하기
            </Typography>

            <form
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              encType="multipart/form-data"
            >
              <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12}>
                  <TextField
                    id="ground_name"
                    name="ground_name"
                    label="경기장 이름"
                    placeholder="경기장 이름을 입력하세요."
                    fullWidth
                    className={classes.textField2}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="경기장 주소"
                    placeholder="경기장 주소를 입력하세요."
                    fullWidth
                    value={isAddress}
                    className={classes.textField2}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    onClick={handleOpen}
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    주소찾기
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    id="address3"
                    name="address3"
                    label="경기장 상세주소"
                    placeholder="경기장 상세 주소를 입력하세요."
                    className={classes.textField2}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={6}>
                  <TextField
                    label="구장 전화번호"
                    id="phonenum"
                    name="phonenum"
                    className={classes.textField2}
                    margin="normal"
                    fullWidth
                    placeholder="구장 전화번호를 입력하세요."
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={3} />
                <Grid item xs={6}>
                  <TextField
                    label="구장 수"
                    id="ground_count"
                    name="ground_count"
                    className={classes.textField}
                    margin="normal"
                    helperText="구장 개수를 입력하세요."
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="구장 가격"
                    id="price"
                    name="price"
                    className={classes.textField}
                    margin="normal"
                    helperText="구장 대여 가격을 입력하세요."
                  />
                </Grid>

                <Grid item xs={3}><Typography component="h6" variant="h6">구장 이미지 등록</Typography></Grid>
                <Grid item xs={3}>
                  <input
                    accept="image/*"
                    id="photo"
                    name="photo"
                    type="file"
                    multiple
                  />
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={2}>
                  <Typography component="h6" variant="h6">이용가능시설</Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="parking_lot"
                        color="primary"
                      />
                    }
                    label="주차장"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="shower_room"
                        color="primary"
                      />
                    }
                    label="샤워장"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="foot_rent"
                        color="primary"
                      />
                    }
                    label="풋살화"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="wifi"
                        color="primary"
                      />
                    }
                    label="와이파이"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="ball_rent"
                        color="primary"
                      />
                    }
                    label="축구공"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="uniform_rent"
                        color="primary"
                      />
                    }
                    label="조끼"
                  />
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={3} />
                <Grid item xs={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.Button}
                    style={{ width: "100%" }}
                  >
                    등록완료
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    type="reset"
                    variant="contained"
                    color="secondary"
                    className={classes.Button}
                    style={{ width: "100%" }}
                  >
                    초기화
                  </Button>
                </Grid>
                <Grid item xs={3} />
              </Grid>
            </form>
            <Modal
              open={open}
              onClose={handleClose}
              className={classes.postCodeStyle}
            >
              {modalbody}
            </Modal>
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default withRouter(GroundRegister);
