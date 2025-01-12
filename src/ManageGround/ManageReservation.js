import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  Container,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import MainLogo from "../MainScreen/MainHeader/MainLogo";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ManageReservation({ location }) {
  const classes = useStyles();
  const [groundinfo, setgroundinfo] = useState(location.state.groundinfo); // 경기장관리에서 경기장정보 받아와서 초기화
  const [tablebody, settablebody] = useState({
    body: 
    <TableRow key="basic">
      <TableCell component="th" scope="row" key="basicsetting">
        Loading
      </TableCell>
    </TableRow>
  }); // 테이블 바디 초기화
  const tablebodys = []; // 테이블 바디 함수
  const tabletime = ["","1타임(08:00 ~ 10:00)","2타임(10:00 ~ 12:00)","3타임(12:00 ~ 14:00)","4타임(14:00 ~ 16:00)","5타임(16:00 ~ 18:00)","6타임(18:00 ~ 20:00)","7타임(20:00 ~ 22:00)","8타임(22:00 ~ 24:00)"]; // 타임 텍스트 배열 선언

  // 현재 날짜 데이터 셋팅
  let today_date = new Date();
  let year = today_date.getFullYear();
  let month = today_date.getMonth() + 1;
  let day = today_date.getDate();
  let current_date = year + (month >= 10 ? "-" : "-0") + month + (day >= 10 ? "-" : "-0") + day;
  var r_date = current_date; // 초기 날짜 오늘날짜로 설정

  // 관리자 권한 예약 이름 설정 메시지 열기, 닫기 함수
  const [managerReservationOpen, setManagerReservationOpen] = useState(false);
  const [ReservationManagerData, setReservationManagerData] = useState({
    r_time : "",
    ground_num : "",
    r_date : "",
    ground_name : "",
    reservation_name : "",
  });
  const handleManagerReservationOpen = (id) =>{
    setManagerReservationOpen(true);
    setReservationManagerData({
      r_time : id.substring(0,1),
      ground_num : id.substring(2,3),
      r_date : r_date,
      ground_name : groundinfo.ground_name,
      reservation_name : "",
    });
  }
  const handleManagerReservationClose = () => {
    setManagerReservationOpen(false);
  }
  const handleReservationName = (e) => {
    setReservationManagerData({
      ...ReservationManagerData,
      reservation_name : e.target.value
    })
  }

  // 삭제확인 다이얼로그 
  const [ReservationCancelOpen, setReservationCancelOpen] = useState(false);
  const [ReservationCancelData, setReservationCancelData] = useState({
    r_no : 0,
    ground_name : "",
    ground_num : 0,
    user_email : "",
    r_date : "",
    r_time : "",
  });
  const handleReservationCancelOpen = (ground) =>{
    setReservationCancelOpen(true);
    setReservationCancelData({
      r_no : ground.r_no,
      ground_name : ground.ground_name,
      ground_num : ground.ground_num,
      user_email : ground.user_email,
      r_date : ground.r_date,
      r_time : tabletime[ground.r_time],
    });
  }
  const handleReservationCancelClose = () => {
    setReservationCancelOpen(false);
  }

  // 예약 날짜 변경(onChange) 함수
  const date_handleChange = (e) => {
    r_date = e.target.value;

    for (var i = 1; i <= 8; i++) {
      getReservation(i)
    }
  };

  // 예약 취소 함수(onClick)
  const ReservationCancel = () => {
    fetch("http://localhost:3001/manage/ground/reservationcancel", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ReservationCancelData),
    })
      .then((res) => res.json())
      .then((json) => {
        alert(json.msg);
        for (var i = 1; i <= 8; i++) {
          getReservation(i)
        }
        setReservationCancelOpen(false);
    });

    fetch("http://localhost:3001/matchlist/matchapplyalert", {
      method: "POST", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        send_id : ReservationCancelData.ground_name + "경기장 관리자",
        receive_id : ReservationCancelData.user_email,
        title : "예약취소알림",
        contents : ReservationCancelData.ground_name + "경기장 / " + ReservationCancelData.ground_num + "구장 / " + ReservationCancelData.r_date + " / " + ReservationCancelData.r_time + "예약이 경기장 관리자에 의해 취소되었습니다.",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
    });


  }

  // 관리자예약하기 함수(onClick)
  const ReservationManager = () => {
    fetch("http://localhost:3001/manage/ground/reservationmanager", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ReservationManagerData),
    })
      .then((res) => res.json())
      .then((json) => {
        alert(json.msg);
        setManagerReservationOpen(false);
        for (var i = 1; i <= 8; i++) {
          getReservation(i)
        }
      });
  }

  // 예약정보 받아오기 함수
  function getReservation(r_time) {
    fetch("http://localhost:3001/manage/ground/reservation", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ground_name: groundinfo.ground_name,
        r_date: r_date,
        r_time: r_time,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        
        var ground = []
        for(var i = 1; i <= groundinfo.ground_count; i++){
          ground[i] = {id : r_time + "/" + i, body : "예약없음"}
        }

        // 받아온 데이터 판별(시간, 구장 별로 구분)
        for(var i=0; i < json.length; i++){
          for(var j=1; j<=groundinfo.ground_count; j++){
            if(json[i].ground_num === j){     
              ground[j] = json[i];
            }
          }
        }
       
        tablebodys[r_time] = tablerow(r_time, ground); 

        settablebody({
          body: tablebodys,
        });
      });
  }

  // 테이블 열 데이터 바인딩
  function tablerow(r_time, ground) {
    return (
      <TableRow key={tabletime[r_time]}>
        <TableCell component="th" scope="row" key={tabletime[r_time]}>
          {tabletime[r_time]}
        </TableCell>
        {ground.map((ground) => (
          ground.body !== "예약없음" ? 
          <TableCell align="center" key={ground.r_no}>{ground.user_email}<br/><Button value={ground.id} variant="outlined" color="secondary" size="small" onClick={() => {handleReservationCancelOpen(ground)}}>예약취소</Button></TableCell> : 
          <TableCell align="center" key={ground.id}>{ground.body}<br/><Button value={ground.id} variant="outlined" color="primary" size="small" onClick={() => {handleManagerReservationOpen(ground.id)}}>관리자직접예약</Button></TableCell>
        ))} 
      </TableRow>
    );
  }



  useEffect(() => {
    for (var i = 1; i <= 8; i++) {
      getReservation(i);
    }
  }, []);

  // 테이블헤드 셋팅함수(구장 갯수별로 셋팅)
  function tablehead() {
    const tablehead = [];
    for (var i = 1; i <= groundinfo.ground_count; i++) {
      tablehead.push(<TableCell align="center" key={i}>{i}구장</TableCell>);
    }
    return tablehead;
  }

  return (
    <React.Fragment>
      <MainLogo />
      <CssBaseline />
      <Container maxWidth="lg" style={{ height:"100%", minHeight:"100vh"}}>
          <Typography
            component="h4"
            variant="h4"
            style={{ textAlign: "center", paddingTop: 20 }}
          >
            경기장 예약 관리
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <TextField
                id="r_date"
                label="조회할 예약날짜"
                type="date"
                defaultValue={current_date}
                fullWidth
                onChange={date_handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginTop: 10 }}
              />
              <Grid item xs={3} />
            </Grid>
          </Grid>

          <TableContainer component={Paper} style={{ marginTop: 20 }}>
            <Table className={classes.table} aria-label="reservation_timetable">
              <TableHead>
                <TableRow>
                  <TableCell>시간/구장</TableCell>
                  {tablehead()}
                </TableRow>
              </TableHead>
              <TableBody>{tablebody.body}</TableBody>
            </Table>
          </TableContainer>

        <Dialog open={managerReservationOpen} onClose={handleManagerReservationClose} area-labelledby = "관리자 예약시 예약자명 입력 다이얼로그" >
          <DialogTitle>{"예약할 사람의 이름을 입력하세요."}</DialogTitle>              
              <DialogContent>
                  <TextField id = "reservation_name" name="reservation_name" onChange={handleReservationName} label="예약자 이름" fullWidth/>
                  <DialogActions>
                    <Button onClick={handleManagerReservationClose} color="primary">
                      닫기
                    </Button>
                    <Button onClick={ReservationManager} color="primary" autoFocus>
                      예약하기
                    </Button>
                  </DialogActions>
              </DialogContent>
            </Dialog>

        <Dialog open={ReservationCancelOpen} onClose={handleReservationCancelClose} area-labelledby = "삭제 확인 메시지" >
          <DialogTitle>{"정말 예약을 취소하시겠습니까?"}</DialogTitle>
              <DialogContent>
                  <DialogActions>
                    <Button onClick={handleReservationCancelClose} color="primary">
                      닫기
                    </Button>
                    <Button onClick={ReservationCancel} color="secondary" autoFocus>
                      예약취소하기
                    </Button>
                  </DialogActions>
              </DialogContent>
            </Dialog>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(ManageReservation);
