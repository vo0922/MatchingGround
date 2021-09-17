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
  ButtonGroup,
} from "@material-ui/core";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { makeStyles } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";

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

export default function MatchListMain() {
  const classes = useStyles();
  const [searchdata, setsearchdata] = useState({
    r_date: "%",
    address: "%",
    ground_name: "%",
    team_name: "%",
  });
  const [matchlistdata, setmatchlistdata] = useState();
  const [matchlistcards, setmatchlistcards] = useState({
    body: "",
  });
  const [locationalignment, setlocationalignment] = useState('전체');
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
  ];
  var locationlist = [
    "전체",
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

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
          body: json.map((json) => (
            <Card
              key={json.match_num}
              className={classes.matchlistcard}
              variant="outlined"
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
                  {json.team_name === "none" ? (
                    <Typography className={classes.cardcontent}>
                      매치개설자 : {json.user_email}
                    </Typography>
                  ) : (
                    <Typography className={classes.cardcontent}>
                      매치개설팀 : {json.team_name}
                    </Typography>
                  )}
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    <Button variant="outlined" color="primary">
                      매치신청
                    </Button>
                  </Grid>
                </Container>
              </CardContent>
            </Card>
          )),
        });
      });
  }

  const [locationdetail, setlocationdetail] = useState({
    body:""
  });

  const handleLocation = (e, newAlignment) =>{
    if(newAlignment === null) return;
    setlocationalignment(newAlignment)
    if(newAlignment === "전체"){
      setlocationdetail({
        body:""
      })
      return;
    } 
    console.log(newAlignment)
    searchlocation(newAlignment)
  }

  function searchlocation(alignment){
    fetch("http://localhost:3001/reservation/search", {
      method : "POST", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body: JSON.stringify({address: alignment}),
  })
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res);
    setlocationdetail({
      body:
      res.map((res) => (
        <Button key={res.properties.sig_kor_nm} style={{ fontSize: 12 }}>
          {res.properties.sig_kor_nm}
        </Button>
      ))
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
        <Typography style={{paddingTop:20}}/>
        <hr/>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          
        >
          <ToggleButtonGroup
            variant="text"
            color="primary"
            value={locationalignment}
            style={{ align: "center", marginTop: 20, marginBottom: 20 }}
            exclusive
            onChange={handleLocation}
          >
           <ToggleButton value="전체" style={{ fontSize: 12 }}>전체</ToggleButton>
           <ToggleButton value="서울" style={{ fontSize: 12 }}>서울</ToggleButton>
           <ToggleButton value="부산" style={{ fontSize: 12 }}>부산</ToggleButton>
           <ToggleButton value="대구" style={{ fontSize: 12 }}>대구</ToggleButton>
           <ToggleButton value="인천" style={{ fontSize: 12 }}>인천</ToggleButton>
           <ToggleButton value="광주" style={{ fontSize: 12 }}>광주</ToggleButton>
           <ToggleButton value="대전" style={{ fontSize: 12 }}>대전</ToggleButton>
           <ToggleButton value="울산" style={{ fontSize: 12 }}>울산</ToggleButton>
           <ToggleButton value="세종" style={{ fontSize: 12 }}>세종</ToggleButton>
           <ToggleButton value="경기" style={{ fontSize: 12 }}>경기</ToggleButton>
           <ToggleButton value="강원" style={{ fontSize: 12 }}>강원</ToggleButton>
           <ToggleButton value="충청북도" style={{ fontSize: 12 }}>충북</ToggleButton>
           <ToggleButton value="충청남도" style={{ fontSize: 12 }}>충남</ToggleButton>
           <ToggleButton value="전라북도" style={{ fontSize: 12 }}>전북</ToggleButton>
           <ToggleButton value="전라남도" style={{ fontSize: 12 }}>전남</ToggleButton>
           <ToggleButton value="경상북도" style={{ fontSize: 12 }}>경북</ToggleButton>
           <ToggleButton value="경상남도" style={{ fontSize: 12 }}>경남</ToggleButton>
           <ToggleButton value="제주" style={{ fontSize: 12 }}>제주</ToggleButton>
           
          </ToggleButtonGroup>
        </Grid>
        {locationalignment !== "전체" ? <Button style={{ fontSize: 12 }}>전체</Button> : null}
        {locationdetail.body}
        <hr />
        {matchlistcards.body}
        
      </Container>

    </div>
  );
}
