import { React, useState, useEffect } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  matchlistcard : {
    margin: 10,
  },
  cardtitle : {
    marginBottom : 5,
    fontSize : 18,
    textAlign : "center",
  },
  cardcontent : {
    marginBottom : 5,
    fontSize : 12,
    textAlign : "center"
  }
})


export default function MatchListMain() {
  const classes = useStyles();
  const [searchdata, setsearchdata] = useState({
    r_date : "%",
    address : "%",
    ground_name : "%",
    team_name : "%",
  });
  const [matchlistdata, setmatchlistdata] = useState();
  const [matchlistcards, setmatchlistcards] = useState({
    body: "",
  });
  var timelabel = ["","08:00 ~ 10:00","10:00 ~ 12:00","12:00 ~ 14:00","14:00 ~ 16:00","16:00 ~ 18:00","18:00 ~ 20:00","20:00 ~ 22:00","22:00 ~ 24:00"]

  function getmatchlist() {
    fetch("http://localhost:3001/matchlist", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(searchdata),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setmatchlistcards({
          body:
            json.map((json) =>
              <Card key={json.match_num} className={classes.matchlistcard} variant="outlined">
                <CardContent>
                  <Container>
                    <Typography component="h6" variant="h6" className={classes.cardtitle}>{json.r_date + " / " + timelabel[json.r_time]}</Typography>
                    <Typography variant="h5" component="h2" className={classes.cardtitle}>{json.ground_name}</Typography>
                    <Typography color="textSecondary" className={classes.cardcontent}>{json.address}</Typography>
                    {json.team_name === "none" ? <Typography className={classes.cardcontent}>매치개설자 : {json.user_email}</Typography> : 
                    <Typography className={classes.cardcontent}>매치개설팀 : {json.team_name}</Typography>}
                    <Grid container justifyContent="center" alignItems="center" style={{marginTop:10,}}><Button variant="outlined" color="primary">매치신청</Button></Grid>
                  </Container>
                </CardContent>
              </Card>
              )
        })
      });
  }

  useEffect(() => {
    getmatchlist();
  }, []);

  return (
    <div>
      <CssBaseline />
      <Container
        maxWidth="md"
        style={{ backgroundColor: "#F3F3F3", marginTop: 5 }}
      >
        {matchlistcards.body}
        <Typography component="div" style={{ height: "100vh" }}></Typography>
      </Container>
    </div>
  );
}
