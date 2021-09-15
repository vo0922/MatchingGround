import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
  },
  pos: {},
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function MainScreen_Teaminfo() {
  const classes = useStyles();
  const [teaminfo, setteaminfo] = useState({
    team_name: "",
    team_count: "",
    win: "",
    lose: "",
    team_date: "",
    team_class: "",
    user_email: window.sessionStorage.getItem("id"),
  });
  const [teamcard, setteamcard] = useState({
    card: "",
  });

  function getTeamdata() {
    fetch("http://localhost:3001/team/info", {
      method: "post", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(teaminfo),
    })
      .then((res) => res.json())
      .then((res) => {
        setteaminfo({
          team_name: res[0].team_name,
          team_count: res[0].team_count,
          win: res[0].win,
          lose: res[0].lose,
          team_date: res[0].team_date,
          team_class: res[0].team_class,
          user_email: window.sessionStorage.getItem("id"),
        });
      });
  }

  useEffect(() => {
    if (window.sessionStorage.getItem("team_name") !== "none") {
      getTeamdata();
      setteamcard({
        card: (
          <Card className={classes.root}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Avatar alt="Temp" className={classes.large}>
                    Girin
                  </Avatar>
                </Grid>
                <Grid item xs={9}>
                  <Typography
                    variant="h5"
                    component="h2"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    {teaminfo.team_name}
                  </Typography>

                  <Typography className={classes.pos} color="textSecondary">
                    {teaminfo.team_count}명 / {teaminfo.team_class} /{" "}
                    {teaminfo.team_date}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    대구광역시 달서구
                  </Typography>
                  <br />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ),
      });
    } else {
      setteamcard({
        card: 
        <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Avatar alt="Temp" className={classes.large}>
                NotTeam
              </Avatar>
            </Grid>
            <Grid item xs={8}>
              <Typography color="textSecondary" style={{textAlign:"center", fontSize:15}}>가입된 팀이 없습니다.</Typography>
              <Button variant="outlined" color="primary" style={{marginTop:10, marginBottom:6,}} fullWidth>팀 생성하기</Button>
              <Button variant="outlined" color="primary" style={{marginTop:6, marginBottom:6,}} fullWidth>팀 가입하기</Button>
            </Grid>
          </Grid>
        </CardContent>
        
      </Card>
      });
    }
  }, []);

  return (
    <div>
      <p>내 팀 정보</p>
      {teamcard.card}
    </div>
  );
}
