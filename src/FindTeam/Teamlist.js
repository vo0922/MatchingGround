import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
   
  photo: {
    height: 150,
    alignItems: "center",
  },
}));

export default function MediaCard() {

  const classes = useStyles();


  const [teamlist, setteamlist] = useState({
    list: '',
  });

  const getteamlist = () => {
    fetch("http://localhost:3001/team/teamlist", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setteamlist({
          list: json.map((data) => (
            <Grid item xs={4}>
            <Card key={data.team_no}>
              <CardMedia/>
              <img className={classes.photo} src={data.team_image} alt="팀 로고"/> 
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {data.team_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  활동 지역 : {data.activity_area} <br/>
                  희망 연령대 : {data.team_age} <br/>
                  팀 수준 : {data.team_class} <br/>
                  팀 인원 : {data.team_count} <br/>
                  팀 소개 : {data.team_introduce}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" color="info" size="small">팀 상세페이지 버튼</Button>
              </CardActions>
            </Card>
            </Grid>
          )),
        });
        console.log(json);
      });
  };

  useEffect(() => {
    getteamlist();
  }, []);

  return (
    <React.Fragment>
      <Grid container spacing={3}>
      {teamlist.list}        
      </Grid>
    </React.Fragment>
  );
}
