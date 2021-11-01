import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    user_email: window.sessionStorage.getItem("id"),
    team_name: "",
    team_count: "",
    team_image: "",
    win: "",
    lose: "",
    team_date: "",
    team_class: "",
    activity_area : "",
    
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
          user_email: window.sessionStorage.getItem("id"),
          team_name: res[0].team_name,
          team_count: res[0].team_count,
          team_image: res[0].team_image,
          win: res[0].win,
          lose: res[0].lose,
          team_date: res[0].team_date,
          team_class: res[0].team_class,
          activity_area: res[0].activity_area,
        });
      });
  }
  useEffect(() => {
    if (window.sessionStorage.getItem("team_name") !== "none") {
      getTeamdata();
    }
  }, [])

  useEffect(() => {
    if (window.sessionStorage.getItem("team_name") !== "none") {
      setteamcard({
        card: (
          <Card className={classes.root} elevation={3}>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Avatar alt="Temp" className={classes.large} src={teaminfo.team_image}/>
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
                    {teaminfo.activity_area}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                   전적 : {teaminfo.win}승 {teaminfo.lose}패 
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ),
      });
    } else {
      setteamcard({
        card: 
        <Card className={classes.root} elevation={3}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={2}/>
            
            <Grid item xs={8}>
              <Typography color="textSecondary" style={{textAlign:"center", fontSize:15, marginTop:5}}>가입된 팀이 없습니다.</Typography>
              <Link to ="/teammake">
                <Button variant="outlined" color="primary" style={{marginTop:10, marginBottom:6, textDecoration:'none'}} fullWidth>팀 생성하기</Button>
              </Link>
              <Link to="/findteam">
                <Button variant="outlined" color="primary" style={{marginTop:6, marginBottom:6, textDecoration:'none'}} fullWidth>팀 가입하기</Button>
              </Link>
            </Grid>
            <Grid item xs={2}/>
          </Grid>
        </CardContent>
        
      </Card>
      });
    }
  }, [teaminfo]);

  return (
    <div>
      <p>내 팀 정보</p>
      {teamcard.card}
    </div>
  );
}
