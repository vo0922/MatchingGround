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
  },
  title: {
    fontSize: 14,
  },
  pos: {
    fontSize : 18,
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const today = new Date();
const today_year = today.getFullYear();

export default function MainScreen_Myinfo() {
  const classes = useStyles();
  const [myinfo, setmyinfo] = useState({
    profile_image : "",
    user_name : "",
    position : "",
    birthyear : 0,
    gender : "",
    height : "",
    introduce : "",
    email : window.sessionStorage.getItem('id'),
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
      gender : res[0].gender,
      height : res[0].height,
      introduce : res[0].introduce,
      email : window.sessionStorage.getItem('id')
    });
  });
  }

  useEffect(() => {
    getMyinfo();
  }, []);

  return (
    <div>
      <Typography variant="h5">내 정보</Typography>
      <Card className={classes.root} elevation={3}>
        <CardContent>
            <Grid container spacing={3}>
            <Grid item xs={3}>
            <Avatar src={myinfo.profile_image} alt="naver profile image" className={classes.large}/>        
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="h5"
              component="h2"
              style={{ marginTop: 10, marginBottom: 10,}}
              
            >
              {myinfo.user_name}
            </Typography>

            <Typography variant="body1" className={classes.pos} color="textSecondary">
              {myinfo.position === 'none' ? "포지션 : 없음." : "포지션 : " + myinfo.position + " / "}
              {myinfo.gender === 'M' ? "남성" : myinfo.gender === 'W' ? "여성" : null}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {today_year - myinfo.birthyear + 1}세 / {myinfo.height === 'none' ? "키 : 없음." : myinfo.height + "cm"}
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
