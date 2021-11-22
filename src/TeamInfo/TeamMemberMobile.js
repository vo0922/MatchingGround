import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import {
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
  } from "@material-ui/core";

const useStyles = makeStyles({});

export default function TeamMember({ history }) {
  const classes = useStyles();

  const [info, setinfo] = useState({
    team_name: window.sessionStorage.getItem("team_name"),
    email: window.sessionStorage.getItem("id"),
  });

  const [cardlist, setcardlist] = useState({
    list: "",
  });

  let today_date = new Date();
  let year = today_date.getFullYear();

  const assignclick = (data) => {
    fetch("http://smartit-16.iptime.org:3001/team/member/assign", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            user_no : data.user_no,
            email : window.sessionStorage.getItem('id'),
        }),
    })
        .then((res)=> res.json())
        .then((json) =>{
            alert(data.user_name + "클럽장 위임이 완료되었습니다.")
            applymail(data.email, "위임");
            window.location.replace('/team');
            
        })            
}

const applymail = (data, state) => {
    fetch("http://smartit-16.iptime.org:3001/matchlist/matchapplyalert", {
      method: "POST", // 통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        send_id: window.sessionStorage.getItem("id"),
        receive_id: data,
        title: state,
        contents:
          window.sessionStorage.getItem("id") +
          " 님이 " +
          data + (state == "위임" ?  "에게 클럽장을 위임하였습니다.": "를 제명하였습니다." )
        }),
    })
      .then((res) => res.json())
      .then((res) => {});
  }

const deleteclick = (data) => {
    fetch("http://smartit-16.iptime.org:3001/team/member/delete", {
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ user_no : data.user_no }),
    })
        .then((res)=> res.json())
        .then((json) =>{
            alert(data.user_name + "클럽원 제명이 완료되었습니다.")
            applymail(data.email, "제명");
            window.location.replace('/team');
        })
}

  // 클럽원 불러오기
  const Member = () => {
    fetch("http://smartit-16.iptime.org:3001/team/member", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((json) => {
        setcardlist({
          list: json.map((data) => (
            <Grid item xs={12} key={data.apply_no}>
              <Card style={{width: '45ch', margin: 5}}>
                <CardContent>
                  <Typography variant="body2" color="inherit">
                    이메일 : {data.email} <br />
                    이름 : {data.user_name} <br />
                    포지션 : {data.position} <br />
                    나이 : {data.age} <br />
                    자기소개 : {data.introduce}
                  </Typography>
                </CardContent>

                {window.sessionStorage.getItem("id") == data.email ? (
                  <Typography
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    클럽장
                  </Typography>
                ) : (
                  <CardActions
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => assignclick(data)}
                    >
                      위임
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => deleteclick(data)}
                    >
                      제명
                    </Button>
                  </CardActions>
                )}
              </Card>
            </Grid>
          )),
        });
      });
  };

  useEffect(() => {
    Member();
  }, []);

  return (
    <React.Fragment>
      <MainLogo />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" style={{ marginTop: 20 }}>
          클럽 맴버관리
        </Typography>
        <br />
        {cardlist.list}
      </Grid>
    </React.Fragment>
  );
}
