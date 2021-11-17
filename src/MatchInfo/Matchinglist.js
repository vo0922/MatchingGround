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
import '../font/font.css'

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
  const [vs_user, setvs_user] = useState({
    user: "",
    vs_user: "",
  });

  const [MatchCancel, setMatchCancel] = useState({
    user_email: window.sessionStorage.getItem("id"),
    vs_user_email: "",
    user_team: window.sessionStorage.getItem("team_name"),
    vs_user_team: "",
  });
  const dialogClickOpen = (
    key,
    vs_user_email,
    vs_team_name,
    user_email,
    user_team
  ) => {
    setOpen(true);
    setmatch_num(key);
    if (MatchCancel.user_email === user_email) {
      setMatchCancel({
        ...MatchCancel,
        vs_user_email: vs_user_email,
        vs_user_team: vs_team_name,
      });
    } else {
      setMatchCancel({
        ...MatchCancel,
        vs_user_email: user_email,
        vs_user_team: user_team,
      });
    }
  };

  const dialogClose = () => {
    setOpen(false);
  };

  const matchcancel = () => {
    var user_team = "";
    var vs_team = "";
    if (MatchCancel.user_team !== "none") {
      user_team = MatchCancel.user_team;
    } else {
      user_team = MatchCancel.user_email;
    }
    if (MatchCancel.vs_user_team !== "none") {
      vs_team = MatchCancel.vs_user_team;
    } else {
      vs_team = MatchCancel.vs_user_email;
    }
    fetch("http://localhost:3001/matchlist/matchapplyalert", {
      method: "POST", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        send_id: MatchCancel.user_email,
        receive_id: MatchCancel.vs_user_email,
        title: "매치취소",
        contents: user_team + " : " + vs_team + "의 매치가 취소되었습니다.",
      }),
    })
      .then((res) => res.json())
      .then((res) => {});
    fetch("http://localhost:3001/matchinfo/matchcancel", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ match_num: match_num }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.msg);
        window.location.reload();
      });
    setOpen(false);
  };

  function list() {
    fetch("http://localhost:3001/matchinfo/matchinglist", {
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
                경기 대기중인 매치가 없습니다.
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
                    {data.vs_count} &nbsp;{" "}
                    {data.team_name !== "none"
                      ? data.team_name
                      : data.user_email} {" "}
                    vs {" "}
                    {data.vs_team_name !== "none"
                      ? data.vs_team_name
                      : data.vs_user_email}
                  </Typography>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        dialogClickOpen(
                          data.match_num,
                          data.vs_user_email,
                          data.vs_team_name,
                          data.user_email,
                          data.team_name
                        )
                      }
                    >
                      매치 취소
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
  return (
    <div>
      {matchinglist.list}
      <Dialog
        open={open}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{fontFamily:'Jua'}}>
          매치취소
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <Typography style={{ fontSize: 16 }}>
            {MatchCancel.user_team !== "none"
              ? MatchCancel.user_team
              : MatchCancel.user_email}{" "}
            :{" "}
            {MatchCancel.vs_user_team !== "none"
              ? MatchCancel.vs_user_team
              : MatchCancel.vs_user_email}{" "}
            와의 매치를 정말 취소 하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} color="secondary">
            취소
          </Button>
          <Button onClick={matchcancel} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
