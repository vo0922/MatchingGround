import Card from "@material-ui/core/Card";
import React, { Component, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Container, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

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
export default function Matchedlist() {
  var today = new Date();
  var current_time = today.getHours();
  var current_r_time = parseInt(current_time / 2) - 3;

  const classes = useStyles();
  const [userinfo, setuserinfo] = useState({
    id: window.sessionStorage.getItem("id"),
    r_time: current_r_time,
  });
  const [matchedlist, setmatchedlist] = useState({
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
  function list() {
    fetch("http://smartit-16.iptime.org:3001/matchinfo/matchedlist", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userinfo),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          setmatchedlist({
            list: (
              <Typography
                key="no_match"
                component="h2"
                variant="h5"
                style={{ textAlign: "center", marginTop: 20, marginBottom:30 }}
              >
                지난 매치가 없습니다.
              </Typography>
            ),
          });
          return;
        }
        setmatchedlist({
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
                      : data.user_eamil}{" "}
                    vs{" "}
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
  return <div>{matchedlist.list}</div>;
}
