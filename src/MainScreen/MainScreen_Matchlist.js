import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
  Button,
} from "@material-ui/core";


const useStyles = makeStyles({
  matchlistcard: {
    margin: 15,
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

export default function MainScreen_Matchlist() {
  const classes = useStyles();
  var today = new Date();
  var current_time = today.getHours();
  var current_r_time = parseInt(current_time / 2) - 3;

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

  const [matchlistcards, setmatchlistcards] = useState({
    body: "",
  }); // 매치리스트 렌더링 변수

  // 매치리스트 받아오기, 렌더링
  function getmatchlist() {
    fetch("http://localhost:3001/mainscreen/matchlist", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({r_time : current_r_time}),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.length === 0) {
          setmatchlistcards({
            body: (
              <Typography
                key="no_match"
                component="h5"
                variant="h5"
                style={{ textAlign: "center", marginTop: 50 }}
              >
                매치가 없어요 ㅜ_ㅜ
              </Typography>
            ),
          });
          return;
        }
        setmatchlistcards({
          body: json.map((json) => (
            <Card
              key={json.match_num}
              className={classes.matchlistcard}
              elevation={3}
            >
              <CardContent>
                <Container>
                  <Typography
                    component="h6"
                    variant="h6"
                    className={classes.cardtitle}
                  >
                    {json.r_date + " / " + timelabel[json.r_time]}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.cardtitle}
                  >
                    {json.ground_name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={classes.cardcontent}
                  >
                    {json.address}
                  </Typography>

                  <Typography
                    style={{ fontSize: 13, textAlign: "center" }}
                    color="primary"
                  >
                    매치신청은 <Link to="/matchlist">매치리스트</Link> 탭을 이용해주세요
                  </Typography>
                </Container>
              </CardContent>
            </Card>
          )),
        });
      });
  }

  useEffect(() => {
    getmatchlist();
  }, []);

  return (
    <div>
      <Typography variant="h5" component="h5" style={{ textAlign: "center" }}>
        매치리스트
      </Typography>
      {matchlistcards.body}
    </div>
  );
}
