import React, { useState, useEffect } from "react";

import { withRouter } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControlLabel,
  Grid,
  Modal,
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
  Checkbox,
} from "@material-ui/core";
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

function GroundModify({ history }) {
  const classes = useStyles();
  const [groundinfo, setgroundinfo] = useState({
    ground_name: "",
    ground_count: 0,
    address: "",
    phonenum: "",
    manager_id: window.sessionStorage.getItem("id"),
    photo: "",
    price: 0,
    parking_lot: "",
    shower_room: "",
    foot_rent: "",
    wifi: "",
    ball_rent: "",
    uniform_rent: "",
  });

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

    if (e.target.photo.files[0] == null) {
      alert("사진을 등록해주세요");
      return;
    }

    const formData = new FormData();
    formData.append("ground_name", e.target.ground_name.value);
    formData.append("ground_count", e.target.ground_count.value);
    formData.append("address", e.target.address2.value + e.target.address3.value);
    formData.append("phonenum", e.target.phonenum.value);
    formData.append("manager_id", window.sessionStorage.getItem("id"));
    formData.append("photo", e.target.photo.files[0] === "" ? groundinfo.photo : e.target.photo.files[0]);
    formData.append("price", e.target.price.value);
    formData.append("parking_lot", e.target.parking_lot.checked);
    formData.append("shower_room", e.target.shower_room.checked);
    formData.append("foot_rent", e.target.foot_rent.checked);
    formData.append("wifi", e.target.wifi.checked);
    formData.append("ball_rent", e.target.ball_rent.checked);
    formData.append("uniform_rent", e.target.uniform_rent.checked);

    groundRegister(formData);
  };

  function getGroundinfo() {
    fetch("http://localhost:3001/ground/info/modify", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(groundinfo),
    })
      .then((res) => res.json())
      .then((rows) => {
        console.log(rows[0]);
        setgroundinfo({
          ground_name: rows[0].ground_name,
          ground_count: rows[0].ground_count,
          address: rows[0].address,
          phonenum: rows[0].phonenum,
          manager_id: window.sessionStorage.getItem("id"),
          photo: rows[0].photo,
          price: rows[0].price,
          parking_lot: rows[0].parking_lot,
          shower_room: rows[0].shower_room,
          foot_rent: rows[0].foot_rent,
          wifi: rows[0].wifi,
          ball_rent: rows[0].ball_rent,
          uniform_rent: rows[0].uniform_rent,
        });
      });
  }

  function groundRegister(groundinfo) {
    fetch("http://localhost:3001/ground/info/register", {
      method: "post",
      body: groundinfo,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        window.sessionStorage.setItem("ground_manager", data.success);
        history.push("/groundmanager");
      });
  }

   useEffect(() => {
     getGroundinfo();
   }, []);

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
                    value={groundinfo.ground_name}
                    helperText="경기장 이름은 수정할 수 없습니다."
                    InputLabelProps={{
                      shrink: true,
                      readOnly:true,
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
                  <TextField required
                    id="address3"
                    name="address3"
                    label="경기장 상세주소"
                    placeholder="경기장 상세 주소를 입력하세요."
                    className={classes.textField2}
                    fullWidth
                    defaultValue={groundinfo.address}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={6}>
                  <TextField required
                    label="구장 전화번호"
                    id="phonenum"
                    name="phonenum"
                    className={classes.textField2}
                    margin="normal"
                    fullWidth
                    placeholder="구장 전화번호를 입력하세요."
                    defaultValue={groundinfo.phonenum}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={3} />
                <Grid item xs={6}>
                  <TextField required
                    label="구장 수"
                    id="ground_count"
                    name="ground_count"
                    className={classes.textField2}
                    margin="normal"
                    helperText="구장 개수를 입력하세요."
                    dafaultValue={groundinfo.ground_count}
                    InputLabelProps={{
                        shrink: true,
                    }}
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
                    value={groundinfo.price}
                    InputLabelProps={{
                        shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <Typography component="h6" variant="h6">
                    구장 이미지 등록
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <input
                    accept="image/*"
                    id="photo"
                    name="photo"
                    type="file"
                    multiple
                  />
                </Grid>
                <Grid item xs={6}>
                    <Typography component="h6" color="gray">
                        이미지를 수정하지 않으면 이전 이미지가 그대로 사용됩니다.
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component="h6" variant="h6">
                    이용가능시설
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControlLabel
                    control={<Checkbox name="parking_lot" color="primary" checked={groundinfo.parking_lot === 'true' ? true : false }/>}
                    label="주차장"
                  />
                  <FormControlLabel
                    control={<Checkbox name="shower_room" color="primary" checked={groundinfo.shower_room === 'true' ? true : false}/>}
                    label="샤워장"
                  />
                  <FormControlLabel
                    control={<Checkbox name="foot_rent" color="primary" checked={groundinfo.foot_rent === 'true' ? true : false} />}
                    label="풋살화"
                  />
                  <FormControlLabel
                    control={<Checkbox name="wifi" color="primary" checked={groundinfo.wifi === 'true' ? true : false}/>}
                    label="와이파이"
                  />
                  <FormControlLabel
                    control={<Checkbox name="ball_rent" color="primary" checked={groundinfo.ball_rent === 'true' ? true : false}/>}
                    label="축구공"
                  />
                  <FormControlLabel
                    control={<Checkbox name="uniform_rent" color="primary" checked={groundinfo.uniform_rent === 'true' ? true : false}/>}
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

export default withRouter(GroundModify);
