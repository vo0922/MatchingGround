import { React, useState, useEffect } from "react";
import {
  Typography,
  Container,
  CssBaseline,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@material-ui/core";

export default function Reservation_current() {
  var timelabel = [
    "",
    "08:00 ~ 10:00",
    "10:00 ~ 12:00",
    "12:00 ~ 14:00",
    "14:00 ~ 16:00",
    "16:00 ~ 18:00",
    "18:00 ~ 20:00",
    "20:00 ~ 22:00",
    "22:00 ~ 24:00",
  ]; // 타임라벨

  var today = new Date();
  var current_time = today.getHours();
  var current_r_time = parseInt(current_time / 2) - 3;

  const [searchdata, setsearchdata] = useState({
    user_email: window.sessionStorage.getItem("id"),
    r_time: current_r_time,
  });

  const [reservationcard, setreservationcard] = useState({
    body: "",
  });

  const [ReservationCancelOpen, setReservationCancelOpen] = useState(false);
  const [ReservationCancelData, setReservationCancelData] = useState("");
  const handleReservationCancelOpen = (id) => {
    setReservationCancelOpen(true);
    setReservationCancelData(id);
  };
  const handleReservationCancelClose = () => {
    setReservationCancelOpen(false);
  };

  const cancel_reservation = () => {
    fetch("http://localhost:3001/manage/ground/reservationcancel", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ r_no: ReservationCancelData }),
    })
      .then((res) => res.json())
      .then((json) => {
        alert("경기장 예약이 정상적으로 취소되었습니다.");
        getreservation();
      });
    setReservationCancelOpen(false);
  };

  function getreservation() {
    console.log(current_r_time);
    fetch("http://localhost:3001/pastreservation/current", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(searchdata),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.length === 0) {
          setreservationcard({
            body: (
              <Typography
                key="no_reservation"
                component="h5"
                variant="h5"
                style={{
                  textAlign: "center",
                  paddingTop: 10,
                  paddingBottom: 20,
                }}
              >
                현재 진행중인 예약이 없습니다.
              </Typography>
            ),
          });
        } else {
          setreservationcard({
            body: json.map((json) => (
              <Card
                style={{ minHeight: 160, minWidth: 300, margin: 20 }}
                key={json.r_no}
              >
                <CardContent>
                  <img
                    src={json.photo}
                    style={{ float: "left", marginRight: 20 }}
                    height="130"
                    width="200"
                  />
                  <Typography variant="h6" component="h2" gutterBottom>
                    {json.ground_name}
                  </Typography>
                  <Typography color="textSecondary">{json.address}</Typography>
                  <Typography color="textSecondary">
                    예약일시 : {json.r_date} / {timelabel[json.r_time]}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{ marginTop: 5 }}
                    onClick={() => handleReservationCancelOpen(json.r_no)}
                  >
                    예약취소
                  </Button>
                </CardContent>
              </Card>
            )),
          });
        }
      });
  }

  useEffect(() => {
    getreservation();
    console.log(searchdata.r_time);
  }, []);

  return (
    <div>
      <Typography
        component="h4"
        variant="h4"
        style={{ padding: 20, textAlign: "center" }}
      >
        진행중인 예약
      </Typography>
      {reservationcard.body}

      <Dialog
        open={ReservationCancelOpen}
        onClose={handleReservationCancelClose}
        area-labelledby="삭제 확인 메시지"
      >
        <DialogTitle>{"정말 예약을 취소하시겠습니까?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel_confirm_text">
            취소시 취소수수료가 부과된 나머지 금액이 환불됩니다. 
          </DialogContentText>
          <DialogContentText id="cancel_confirm_text">
            그래도 예약을 취소하시겠습니까?
          </DialogContentText>
            
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReservationCancelClose} color="primary">
            닫기
          </Button>
          <Button onClick={cancel_reservation} color="secondary" autoFocus>
            예약취소하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
