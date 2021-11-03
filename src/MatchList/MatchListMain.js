import { React, useState, useEffect } from "react";
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  Tabs,
  Tab,
  Box,
} from "@material-ui/core";
import {
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  ButtonGroup,
} from "@mui/material"
import { makeStyles } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";

const useStyles = makeStyles({
  root:{
    backgroundImage:"public\groundimage\groundimage1632817067969IMG_0504.JPG"
  },
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
  datetab:{
    borderRadius:50, 
    backgroundColor:"white", 
    margin:5, 
    minWidth:110,
    maxWidth:110,
    fontSize:17,
  },
  
});

export default function MatchListMain() {
  let locationbutton={
    fontSize: 14, 
    margin : 2, 
    backgroundColor : "white", 
    borderRadius : 15,
    fontFamily:"Gamja_Flower"
  } // 광역시, 도 버튼 스타일 적용

  const classes = useStyles();

  var today = new Date(); // 오늘 날짜 받아오기
  var current_time = today.getHours();
  var current_r_time = parseInt(current_time / 2) - 3;

  const [searchdata, setsearchdata] = useState({
    r_date: today.getFullYear() + "-" +((today.getMonth()+1) < 10 ? "0" + (today.getMonth()+1) : today.getMonth()+1) + "-" + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()),
    r_time: current_r_time,
    address: "%",
  }); // 검색 데이터

  const [matchlistcards, setmatchlistcards] = useState({
    body: "",
  }); // 매치리스트 렌더링 변수

  const [locationalignment, setlocationalignment] = useState("전체"); // 광역시, 도 선택변수
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


  const [datevalue, datesetValue] = useState(0); // 변경된 날짜 변수(여러번 클릭 시 날짜가 계속 더해지는 현상 방지)
  var week = ["일", "월", "화", "수", "목", "금", "토"];
  
  // 날짜 변경시 이벤트 함수
  const datehandleChange = (event, newValue) => {
    if(newValue === datevalue)
      return;
    
    datesetValue(newValue);
    var search_date = new Date(today.setDate(today.getDate() + newValue))
    var search_date2 = search_date.getFullYear() + "-" +((search_date.getMonth()+1) < 10 ? "0" + (search_date.getMonth()+1) : search_date.getMonth()+1) + "-" + (search_date.getDate() < 10 ? "0" + search_date.getDate() : search_date.getDate())

    setsearchdata({
      ...searchdata,
      r_date : search_date2,
    })

  };

  // 날짜버튼 렌더링 변수
  const [datebutton, setdatebutton] = useState({
    body: <Tab key="loading" label="loading" className={classes.datetab} />,
  });

  // 오늘 날짜기준으로 14일동안의 날짜버튼 생성
  function getweek() {
    var tabs = [];
    for (var i = 0; i < 14; i++) {
      var tomorrow = new Date();
      tomorrow = new Date(tomorrow.setDate(today.getDate() + i));
      var dayOfweek = week[tomorrow.getDay()];
      var label = tomorrow.getMonth() + 1 + "월 " + tomorrow.getDate() + "일"
      var label2 = dayOfweek
      
      tabs.push(
      <Tab key={tomorrow} label={label + " (" +label2 + ")"} wrapped className={classes.datetab} />
      );
    }
    return tabs;
  }
  


  // 매치리스트 받아오기, 렌더링
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
        if(json.length === 0){
          setmatchlistcards({
            body:
            <Typography key="no_match" component="h5" variant="h5" style={{textAlign:"center", marginTop:50}}>개설된 매치가 없습니다. 직접 매치를 개설해보세요!</Typography>
          })
          return;
        }
        setmatchlistcards({
          body: json.map((json) => (
            <Card
              key={json.match_num}
              className={classes.matchlistcard}
              elevation={1}
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
                    className={classes.cardtitle}
                  >
                    {json.ground_name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    className={classes.cardcontent}
                    style={{fontSize:16}}
                  >
                    {json.address}
                  </Typography>
                  {json.team_name === "none" ? (
                    <Typography className={classes.cardcontent} style={{fontSize:16}}>
                      매치개설자 : {json.user_email}
                    </Typography>
                  ) : (
                    <Typography className={classes.cardcontent} style={{fontSize:16}}>
                      매치개설팀 : {json.team_name} / 팀 수준 : {json.team_class} / {json.vs_count}
                    </Typography>
                  )}
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 10 }}
                  >
                    {json.user_email !== window.sessionStorage.getItem('id') ?
                    (json.match_success ? 
                    <Button disabled variant="contained"><Typography>신청마감</Typography></Button> : 
                    ((json.r_time - 1) === current_r_time ? 
                    <Button onClick={() => handleApplyOpen(json.match_num, json.user_email, json.team_name, json.ground_name, json.r_date, json.r_time, json.ground_num, json.address)} variant="outlined" color="error"><Typography>마감임박</Typography></Button> :
                    <Button onClick={() => handleApplyOpen(json.match_num, json.user_email, json.team_name, json.ground_name, json.r_date, json.r_time, json.ground_num, json.address)} variant="outlined" color="primary"><Typography>매치신청</Typography></Button>))
                    : <Button disabled variant="contained"><Typography>매치신청</Typography></Button>}
                  </Grid>
                </Container>
              </CardContent>
            </Card>
          )),
        });
      });
  }

  // 세부주소 항목
  const [locationdetail, setlocationdetail] = useState({
    body: "",
  });

  // 광역시, 도 선택 시 이벤트 함수 -> 세부주소 버튼 출력, 검색 데이터 변경
  const handleLocation = (e, newAlignment) => {
    
    if (newAlignment === null) return;
    setlocationalignment(newAlignment);
    if (newAlignment === "전체") {
      setlocationdetail({
        body: "",
      });
      setsearchdata({
        ...searchdata,
        address : "%"
      })
      return;
    }
    
    searchlocation(newAlignment, e.target.id);

    setsearchdata({
      ...searchdata,
      address : "%" + e.target.id + "%"
    })
  };

  // 세부주소 선택 이벤트 함수 -> 검색데이터 변경
  const handleLocationDetail = (location, locationdetail) => {
    if(locationdetail === "전체"){
      location = searchdata.address.substring(1,3)
      setsearchdata({
        ...searchdata,
        address : "%" + location + "%"
      });
    }
    else{
      setsearchdata({
        ...searchdata,
        address : "%" + location + " " + locationdetail + "%"
      });
    }
  }

  // 광역시, 도 기반으로 시,군,구 데이터 받아와 버튼렌더링
  function searchlocation(location, location_short) {
    fetch("http://localhost:3001/reservation/search", {
      method: "POST", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ address: location }),
    })
      .then((res) => res.json())
      .then((res) => {
        setlocationdetail({
          body: res.map((res) => (
            <Button key={res.properties.sig_kor_nm} onClick={() => handleLocationDetail(location_short, res.properties.sig_kor_nm)} value={res.properties.sig_kor_nm} color="inherit" style={{ fontSize: 12 }}>
              <Typography>{res.properties.sig_kor_nm}</Typography>
            </Button>
          )),
        });
      });
  }

  // 매치신청 다이얼로그 세팅
  const [applyOpen, setapplyOpen] = useState(false);
  const [applyContent, setapplyContent] = useState({
    match_num : 0,
    user_email : "",
    team_name : "",
    ground_name : "",
    r_date : "",
    r_time : "",
    ground_num : "",
    address : "", 
  });

  const handleApplyOpen = (match_num, user_email, team_name, ground_name, r_date, r_time, ground_num, address) => {
    setapplyContent({
      match_num : match_num,
      user_email : user_email,
      team_name : team_name,
      ground_name : ground_name,
      r_date : r_date,
      r_time : r_time,
      ground_num : ground_num,
      address : address, 
    })
    setapplyOpen(true);
  }

  const handleApplyClose = () => {
    setapplyOpen(false);
  }

  function applysend(){
    fetch("http://localhost:3001/matchlist/matchapplyalert", {
      method: "POST", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        send_id : window.sessionStorage.getItem('id'),
        receive_id : applyContent.user_email,
        title : "매치신청",
        contents : "지금바로 내매칭정보에서 확인해보세요!",
        link:"http://localhost:3000/matchinfo"
      }),
    })
      .then((res) => res.json())
      .then((res) => {
    });

    fetch("http://localhost:3001/matchlist/matchapply", {
      method: "POST", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        match_num : applyContent.match_num,
        send_id : window.sessionStorage.getItem('id'),
        send_team : window.sessionStorage.getItem('team_name'),

      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if(res.success){
          alert("신청이 완료되었습니다.");
          getmatchlist();
        }
          
    });
    
    setapplyOpen(false);
  }

  // 현재날짜 기반 날짜버튼 렌더링
  useEffect(() => {
    setdatebutton({
      body: getweek(),
    });
  }, []);

  // 검색 데이터 변경시 매치리스트 재렌더링
  useEffect(() => {
    getmatchlist();
    console.log(searchdata)
  }, [searchdata])

  return (
    <div>
      <CssBaseline />
      <Container
        maxWidth="md"
        style={{ backgroundColor: "#F3F3F3", marginTop: 5, minHeight:"100vh", height:"100%"}}
      >
        <Typography style={{ paddingTop: 20 }}/>
        <Box sx={{ bgcolor: "#F3F3F3", marginBottom:20, }}>
          <Tabs
            value={datevalue}
            onChange={datehandleChange}
            variant="scrollable"
            scrollButtons="auto"
            indicatorColor="primary"
            textColor="primary"
            style={{borderRadius:50,}}
            aria-label="dateTabs"
            
          >
            {datebutton.body}
          </Tabs>
        </Box>
        <hr/>
        <Grid container justifyContent="center" alignItems="center">
        <ToggleButtonGroup
            variant="text"
            color="primary"
            value={locationalignment}
            style={{ align: "center", marginTop: 10, marginBottom: 10,}}
            exclusive
            onChange={handleLocation}
          >
            <ToggleButton id="" value="전체" label="%" style={locationbutton}>
              전체
            </ToggleButton>
            <ToggleButton id="서울" value="서울" style={locationbutton}>
              서울
            </ToggleButton>
            <ToggleButton id="부산" value="부산" style={locationbutton}>
              부산
            </ToggleButton>
            <ToggleButton id="대구" value="대구" style={locationbutton}>
              대구
            </ToggleButton>
            <ToggleButton id="인천" value="인천" style={locationbutton}>
              인천
            </ToggleButton>
            <ToggleButton id="광주" value="광주" style={locationbutton}>
              광주
            </ToggleButton>
            <ToggleButton id="대전" value="대전" style={locationbutton}>
              대전
            </ToggleButton>
            <ToggleButton id="울산" value="울산" style={locationbutton}>
              울산
            </ToggleButton>
            <ToggleButton id="세종" value="세종" style={locationbutton}>
              세종
            </ToggleButton>
            <ToggleButton id="경기" value="경기" style={locationbutton}>
              경기
            </ToggleButton>
            <ToggleButton id="강원" value="강원" style={locationbutton}>
              강원
            </ToggleButton>
            <ToggleButton id="충북" value="충청북도" style={locationbutton}>
              충북
            </ToggleButton>
            <ToggleButton id="충남" value="충청남도" style={locationbutton}>
              충남
            </ToggleButton>
            <ToggleButton id="전북" value="전라북도" style={locationbutton}>
              전북
            </ToggleButton>
            <ToggleButton id="전남" value="전라남도" style={locationbutton}>
              전남
            </ToggleButton>
            <ToggleButton id="경북" value="경상북도" style={locationbutton}>
              경북
            </ToggleButton>
            <ToggleButton id="경남" value="경상남도" style={locationbutton}>
              경남
            </ToggleButton>
            <ToggleButton id="제주" value="제주" style={locationbutton}>
              제주
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {locationalignment !== "전체" ? (
          <Button onClick={() => handleLocationDetail("", "전체")} color="inherit"><Typography>전체</Typography></Button>
        ) : null}
        {locationdetail.body}
        <hr />
        {matchlistcards.body}
      </Container>
      <Dialog
        open={applyOpen}
        onClose={handleApplyClose}
        aria-labelledby="apply-dialog"
        aria-describedby="apply-dialog"
      >
        <DialogTitle id="apply-dialog-title" style={{fontWeight:"bold"}}>
          {"매치를 신청하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <hr/>
          <DialogContentText id="alert-dialog-description" style={{fontSize:15}}>
            날짜 : {applyContent.r_date} <br/>
            시간 : {timelabel[applyContent.r_time]} <br/>
            경기장 : {applyContent.ground_name} <br/>
            주소 : {applyContent.address} <br/>
            매치 개설자 : {applyContent.user_email} <br/>
            팀 이름 : {applyContent.team_name === "none" ? "개인매치" : applyContent.team_name} <br/>
          </DialogContentText>
          <hr/>
          <DialogContentText color="primary">
            <br/>
            매치 내용 확인 후 신청하기 버튼을 누르세요.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleApplyClose}>취소</Button>
          <Button color="primary" onClick={applysend} style={{fontWeight:"bold"}} autoFocus>
            신청하기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
