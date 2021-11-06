import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Grid,
  Typography,
  Button,
  Container,
  TextField,
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
} from "@material-ui/core";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { withRouter } from "react-router";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 36,
    textAlign: "center",
  },
  photo: {
    height: 256,
    width: 256,
    alignItems: "center",
  },
  data: {
    fontSize: 20,
  },
  title_introduce: {
    textAlign: "center",
    fontSize: 28,
  },
  introduce: {
    fontSize: 20,
  },
  table: {
    minWidth: 650,
  },
}));

function MyLoad({ history }) {
  const classes = useStyles();

  function link_Modify(){
    history.push({
      pathname:"/myinfo/modify",
      state:{
        info:info,
      },
    });
  } 

  const [info, setinfo] = useState({
    profile_image: "",
    user_name: "",
    birthyear: "",
    height: "",
    gender: "",
    position: "",
    team_name: "",
    introduce: "",
    email: window.sessionStorage.getItem("id"),
  });

  //정보 API
  const myinfomation = () => {
    fetch("http://localhost:3001/myinfo", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((json) => {
        setinfo({
          profile_image: json[0].profile_image,
          user_name: json[0].user_name,
          birthyear: json[0].birthyear,
          height: json[0].height,
          gender: json[0].gender,
          position: json[0].position,
          team_name: json[0].team_name,
          introduce: json[0].introduce,
          email: info.email,
        });

      });
  };

  function createData(name, content) {
    return { name, content };
  }

  const rows = [
    createData("이름 ", info.user_name),
    createData("성별 ", info.gender === 'M' ? '남자' : info.gender === 'F' ? '여자' : null),
    createData("출생년도 ", info.birthyear),
    createData("키 ", info.height),
    createData("포지션 ", info.position),
    createData("소속 팀 정보 ", info.team_name),
  ];

  useEffect(() => {
    myinfomation();
  }, []);

  return (
    <React.Fragment>
      <Container
        maxWidth="md"
        style={{ minHeight:"100vh", height: "100%", paddingTop: 20}}
      >
          <Grid container spacing={3}>
            <Grid
              item
              xs
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Avatar src={info.profile_image} className={classes.photo} />
            </Grid>
            <Grid item xs>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.content}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12}>
              <Typography component="div" variant="h5">
                자기 소개
              </Typography>
              <TextField
                multiline
                fullWidth
                rows={4}
                defaultValue={info.introduce}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              item
              xs={12}
            >
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={link_Modify}
              >
                수정하기
              </Button>
            </Grid>
          </Grid>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(MyLoad);
