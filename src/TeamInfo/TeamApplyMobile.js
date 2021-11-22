import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import MainLogo from "../MainScreen/MainHeader/MainLogo";

export default function TeamApplyMobile() {
  const [applylist, setapplylist] = useState({
    list: "",
  });

  const [teamapply, setteamapply] = useState({
    apply_no: "",
    team_name: window.sessionStorage.getItem("team_name"),
    user_name: "",
    state: "",
    email: "",
    age: "",
    position: "",
    introduce: "",
  });

  const applymanager = () => {
    fetch("http://smartit-16.iptime.org:3001/team/teamapply", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(teamapply),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.length === 0) {
          setapplylist({
            list: (
              <Typography variant="h6">클럽에 가입 신청자가 없어요...</Typography>
            ),
          });
        } else {
          setapplylist({
            list: json.map((data) => (
              <Grid item xs={12} key={data.apply_no}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="inherit">
                      이메일 : {data.email} <br />
                      이름 : {data.user_name} <br />
                      포지션 : {data.position} <br />
                      나이 : {data.age} <br />
                      자기소개 : {data.introduce}
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{ justifyContent: "center", display: "flex" }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => applybutton(data)}
                    >
                      가입 승인
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => leavebutton(data)}
                    >
                      가입 거절
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            )),
          });
        }
      });
  };

  // 승인 버튼
  const applybutton = (data) => {
    fetch("http://smartit-16.iptime.org:3001/team/apply", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ selectionModel: data.apply_no }),
    })
      .then((res) => res.json())
      .then((json) => {});
    console.log(data.apply_no);
    alert("클럽원 가입신청이 승인되었습니다.");
    window.location.replace("/team");
  };

  // 거절 버튼
  const leavebutton = (data) => {
    fetch("http://smartit-16.iptime.org:3001/team/leave", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ selectionModel: data.apply_no }),
    })
      .then((res) => res.json())
      .then((json) => {});
    console.log(data.apply_no);
    alert("클럽원 가입신청이 거절되었습니다.");
    window.location.replace("/team");
  };

  useEffect(() => {
    applymanager();
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
        <Typography variant="h4" style={{ marginTop : 20}}>클럽 가입 신청관리</Typography>
        <br />
        {applylist.list}
      </Grid>
    </React.Fragment>
  );
}
