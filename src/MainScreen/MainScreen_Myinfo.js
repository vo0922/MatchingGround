import {React, useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginLeft:10,
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

export default function MainScreen_Myinfo() {
  const classes = useStyles();
  const [myinfo, setmyinfo] = useState({
    profile_image : "",
    user_name : "",
    position : "",
    birthyear : "",
    height : "",
    introduce : "",
    //user_email : window.sessionStorage.getItem('id'),
    email : "rilakkuma159@naver.com"
  });

  function getMyinfo() {
    fetch("http://localhost:3001/myinfo", {
      method : "post", // 통신방법
      headers : {
          "content-type" : "application/json",
      },
      body : JSON.stringify(myinfo),
  })
  .then((res)=>res.json())
  .then((res)=>{
    setmyinfo({
      profile_image : res[0].profile_image,
      user_name : res[0].user_name,
      position : res[0].position,
      birthyear : res[0].birthyear,
      height : res[0].height,
      introduce : res[0].introduce,
      email : "rilakkuma159@naver.com"
      //email : window.sessionStorage.getItem('id')
    });
  });
  }

  useEffect(() => {
    getMyinfo();
  }, []);

  return (
    <div>
      <p>내 정보</p>
      <Card className={classes.root}>
        <CardContent>
            <Grid container spacing={3}>
            <Grid item xs={3}>
            <Avatar alt="naver profile image" className={classes.large} src={myinfo.profile_image}  />        
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="h5"
              component="h2"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              {myinfo.user_name}
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              {myinfo.position}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {myinfo.birthyear}년 생 / {myinfo.height}cm
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {myinfo.introduce}
            </Typography>
          </Grid>
            </Grid>
          
        </CardContent>
      </Card>
    </div>
  );
}
