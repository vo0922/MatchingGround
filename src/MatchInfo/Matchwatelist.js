import Card from "@material-ui/core/Card";
import React, { Component, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Container, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles({
  matchlistcard: {
    margin: 10,
  },
  cardtitle: {
    marginBottom: 5,
    fontSize: 18,
    textAlign: "center",
  },
  cardcontent: {
    marginBottom: 5,
    fontSize: 12,
    textAlign: "center",
  },
});
export default function Matchinglist() {
  var today = new Date();
  var current_time = today.getHours();
  var current_r_time = parseInt(current_time / 2) - 3;

  const classes = useStyles();
  const [userinfo, setuserinfo] = useState({
    id: window.sessionStorage.getItem("id"),
    r_time: current_r_time,
  });
  const [matchinglist, setmatchinglist] = useState({
    list: "",
  });
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

  const [open, setOpen] = useState(false);
  const [match_num, setmatch_num] = useState(0);
  const [reservationinfo, setreservationinfo] = useState({
    ground_name : '',
    r_date : '',
    r_time : '',
    ground_num : '',
    address : '',
  });
  const dialogClickOpen = (key) => {
    setOpen(true);
    setmatch_num(key);
  };

  const dialogClose = () => {
    setOpen(false);
  };

  const matchdelete = () => {
    // fetch("http://localhost:3001/matchinfo/matchcancel", {
    //   method: "post", // 통신방법
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({match_num : match_num}),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     alert(res.msg);
    //   })
      setOpen(false);
      window.location.reload();
  }

  function list() {
    fetch("http://localhost:3001/matchinfo/matchwatelist", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userinfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          setmatchinglist({
            list: (
              <Typography
                key="no_match"
                component="h2"
                variant="h5"
                style={{ textAlign: "center", marginTop: 20 }}
              >
                대기중인 매칭이 없습니다.
              </Typography>
            ),
          });
          return;
        }
        setmatchinglist({
          list: res.map((data) => (
            <Card
              className={classes.matchlistcard}
              variant="outlined"
              key={data.match_num}
            >
              <CardContent>
                <Container>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.cardtitle}
                  >
                    {data.r_date + " / " + timelabel[data.r_time]}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.cardtitle}
                  >
                    {data.ground_name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={classes.cardcontent}
                  >
                    {data.address}
                  </Typography>
                  <Typography className={classes.cardcontent}>
                    매치개설자 : {data.user_email}
                  </Typography>
                  <Typography className={classes.cardcontent}>
                    매치인원 : {data.vs_count}
                  </Typography>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => dialogClickOpen(data.match_num)}
                    >
                      예약 취소
                    </Button>
                  </Grid>
                </Container>
              </CardContent>
            </Card>
          )),
        });
      });
  }

  useEffect(() => {
    list();
  }, []);
  return <div>
    {matchinglist.list}
        <Dialog
        open={open}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"예약취소"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          경기장 정보
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose}>취소</Button>
          <Button onClick={matchdelete}>확인</Button>
        </DialogActions>
      </Dialog>
      </div>
}
