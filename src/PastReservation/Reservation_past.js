import { React, useState, useEffect } from "react";
import {withRouter} from 'react-router-dom'
import { Typography, Container, CssBaseline, Card, CardContent, Button } from "@material-ui/core";

function Reservation_past({history}) {
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

  const reReservation = (ground_name) => {
      history.push({
          pathname : "/reservation/detail",
          state:{
              cardkey : ground_name,
          }
      });
  }

  function getreservation() {
    console.log(current_r_time);
    fetch("http://localhost:3001/pastreservation/past", {
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
                style={{ textAlign: "center", paddingTop: 50 }}
              >
                지난 예약이 없습니다.
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
                    color="primary"
                    style={{ marginTop: 5 }}
                    onClick={() => reReservation(json.ground_name)}
                  >
                    다시 예약하기
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
            지난 예약
          </Typography>
          {reservationcard.body}

    </div>
  );
}

export default withRouter(Reservation_past);