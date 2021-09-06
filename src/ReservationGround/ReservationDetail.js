import React, { Component, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MainLogo from '../MainScreen/MainHeader/MainLogo'
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

function ReservationDetail({location}) {
  //구장 정보
    const [ground, setground] = useState({
      title: '',
      content: '',
      img: '',
      address: '',
      phonenum: '',
      parking_lot: '',
      shower_room: '',
      foot_rent: '',
      wifi: '',
      ball_rent: '',
      uniform_rent: '',
    });
  //구장 수
    const [groundlist, setgroundlist] = useState({
      count: '',
    })
  //구장 예약 정보
    const [reservation, setreservation] = useState({
      time : "",
    })
  //상대방과 매칭희망 체크 여부
    const [checkbox, setcheckbox] = useState({
      checkbox: "0",
    })

    let today_date = new Date();
    let year = today_date.getFullYear();
    let month = today_date.getMonth() + 1;
    let day = today_date.getDate();
    let current_date = year + (month >= 10 ? "-" : "-0") + month + (day >= 10 ? "-" : "-0") + day;
  //경기장 정보 가져오기
    const reqground = () => {
        fetch("http://localhost:3001/reservation/detail", {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(location.state),
        })
            .then((res) => res.json())
            .then((res) => {
                setground({
                    title: res[0].ground_name,
                    content: res[0].grund_address,
                    img: "/" + res[0].photo,
                    address: res[0].address,
                    phone: res[0].phonenum,
                    parking_lot: res[0].parking_lot,
                    shower_room: res[0].shower_room,
                    foot_rent: res[0].foot_rent,
                    wifi: res[0].wifi,
                    ball_rent: res[0].ball_rent,
                    uniform_rent: res[0].uniform_rent,
                });
            });
    };
    //경기장 수 가져오기
    const reqgroundlist = () => {
      fetch("http://localhost:3001/reservation/detail/list", {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(location.state),
        })
            .then((res) => res.json())
            .then((res) => {
                setgroundlist({
                  count: 
                    res.map((data) =>
                    <option key={data.ground_id} value={data.ground_num}>{data.ground_num}구장</option>
                    )
                });
            });
    }

    var r_date = current_date;
    var ground_num = 1;
    var ground_name = location.state.cardkey;
    var time = new Array(9).fill(false);
    var timelabel = ["08:00 ~ 10:00","10:00 ~ 12:00","12:00 ~ 14:00","14:00 ~ 16:00","16:00 ~ 18:00","18:00 ~ 20:00","20:00 ~ 22:00","22:00 ~ 24:00"]
    var r_time = 1;
    //경기장 예약 정보 가져오기
    const reqreservation = () => {
      fetch("http://localhost:3001/reservation/detail/book", {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({r_date: r_date, ground_num: ground_num, ground_name: ground_name,}),
        })
            .then((res) => res.json())
            .then((res) => {
              for(var i = 0; i<res.length; i++) {
                time[res[i].r_time] = true;
              }
              setreservation({
                time:time
              })
            });
    }
    //예약 바 UI
    const timebar = (i) => {
      return (reservation.time[i] ? <Paper variant="outlined" style={{height:30, width:100, backgroundColor:'gray'}}/> : <Paper variant="outlined" style={{height:30, width:100}}/>);
    }
    //예약 라디오 UI
    const timeradio = (i) => {
      return (reservation.time[i] ? <FormControlLabel value={String(i)} control={<Radio color="primary" />} label={timelabel[i-1]} disabled/> : <FormControlLabel value={String(i)} control={<Radio color="primary" />} label={timelabel[i-1]} />);
    }

    useEffect(() => {
        reqground();
        reqgroundlist();
        reqreservation(ground_num);
    },[])
    //예약 정보 검색
    const handleSearch = (e) => {
      if(e.target.id==="date")
        r_date = e.target.value;
      if(e.target.id==="ground_num")
        ground_num = e.target.value;
      reqreservation();
    }
    //예약 값 가져오기
    const handleRadio = (e) => {
      r_time = e.target.value;
    }
    //예약 정보 저장하기
    const handleChecked = (e) => {
      if(e.target.checked) {
        setcheckbox({checkbox:"1"})
      } else {
        setcheckbox({checkbox:"0"})
      }
    }

  return (
    <React.Fragment>
      <MainLogo />
      <CssBaseline />
      <Container maxWidth="md" style={{ backgroundColor: "white" }}>
        <Typography component="div" style={{ height: "120vh" }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <h1>{ground.title}</h1>
            <img src={ground.img} height="450" />
          </Grid>

          <Grid container spacing={3} style={{ marginTop: 30 }}>
            <Grid item xs={5} style={{ marginLeft: 20 }}>
              <h3>상세정보</h3>
              <p>주소 : {ground.address}</p>
              <p>전화번호 : {ground.phone}</p>
            </Grid>
            <Grid item xs={6}>
              <h3>이용안내</h3>
              {ground.parking_lot === "true" ? (
                <LocalParkingIcon fontSize="large" />
              ) : null}
              {ground.ball_rent === "true" ? (
                <SportsSoccerIcon fontSize="large" />
              ) : null}
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginTop: 30 }}>
            <Grid item xs={3} style={{ marginLeft: 10 }}>
              <form noValidate>
                <TextField
                  id="date"
                  label="날짜 선택"
                  type="date"
                  defaultValue={current_date}
                  onChange={handleSearch}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>
            <Grid item xs={8}>
              <Grid style={{ display: "flex" }}>
                <Paper
                  variant="outlined"
                  style={{ height: 20, width: 20, marginRight: 10 }}
                />
                예약가능
                <Paper
                  variant="outlined"
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 10,
                    marginLeft: 20,
                    backgroundColor: "gray",
                  }}
                />
                예약불가
              </Grid>
              <Grid style={{ marginTop: 15, display: "flex" }}>
                {timebar(1)}
                {timebar(2)}
                {timebar(3)}
                {timebar(4)}
                {timebar(5)}
                {timebar(6)}
                {timebar(7)}
                {timebar(8)}
              </Grid>
              <Grid style={{ display: "flex" }}>
                08
                <div style={{ width: 90 }} />
                10 <div style={{ width: 90 }} />
                12 <div style={{ width: 90 }} />
                14 <div style={{ width: 90 }} />
                16
                <div style={{ width: 90 }} />
                18 <div style={{ width: 90 }} />
                20 <div style={{ width: 90 }} /> 22
                <div style={{ width: 90 }} />
                00
              </Grid>
            </Grid>
            <Grid item xs={3} style={{ paddingLeft: 20 }}>
              <FormControl>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  구장선택
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "count",
                    id: "ground_num",
                  }}
                  onChange={handleSearch}
                >
                  {groundlist.count}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <FormControl component="fieldset">
                <FormLabel component="legend">시간선택</FormLabel>
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue={1}
                  id="r_time"
                  onChange={handleRadio}
                >
                  {timeradio(1)}
                  {timeradio(2)}
                  {timeradio(3)}
                  {timeradio(4)}
                  {timeradio(5)}
                  {timeradio(6)}
                  {timeradio(7)}
                  {timeradio(8)}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={5} style={{ marginLeft: 10 }}></Grid>
            <Grid container justifyContent="center" alignItems="center">
              <FormControl component="fieldset">
                <FormLabel component="legend"></FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="1"
                    control={<Checkbox color="primary" />}
                    label="상대방과 매칭 희망"
                    labelPlacement="end"
                    onChange={handleChecked}
                  />
                  {checkbox.checkbox === "0" ? (
                    <FormControlLabel
                      value="0"
                      control={<Checkbox color="primary" />}
                      label="매치가 성사되지 않아도 경기장 예약"
                      labelPlacement="end"
                      style={{ marginLeft: 100 }}
                      disabled
                    />
                  ) : (
                    <FormControlLabel
                      value="0"
                      control={<Checkbox color="primary" />}
                      label="매치가 성사되지 않아도 경기장 예약"
                      labelPlacement="end"
                      style={{ marginLeft: 100 }}
                    />
                  )}
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: 20 }}
          >
            <Button variant="contained" color="primary">
              예약 신청하기
            </Button>
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(ReservationDetail)