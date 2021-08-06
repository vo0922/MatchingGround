import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { minWidth } from "@material-ui/system";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    margin: "50px auto",
    width: 128,
    height: 128,
  },
  table: {
    marginTop: 10,
    maxwidth: "auto",
  },
});



export default function GroundManager() {
  const [groundinfo, setgroundinfo] = useState({
    ground_name: "",
    address: "",
    ground_count: "",
    price: "",
    manager_id: "aaa",
    //manager_id : window.sessionStorage.getItem('user_id'),
  });

  function getgroundinfo(){
    fetch("http://localhost:3001/ground/info/manager", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(groundinfo),
    })
      .then((res) => res.json())
      .then((json) => {
        //console.log(json);
        setgroundinfo({
          ground_name: json[0].ground_name,
          address: json[0].address,
          ground_count: json[0].ground_count,
          price: json[0].price,
          manager_id: groundinfo.manager_id,
        });
      });
  };

  function createData(category, contents) {
    return { category, contents };
  }

  const rows = [
    createData("경기장이름", groundinfo.ground_name),
    createData("경기장위치", groundinfo.address),
    createData("구장 수", groundinfo.ground_count),
    createData("가격", groundinfo.price),
  ];

  useEffect(() => {
    getgroundinfo();
  }, []);


  const classes = useStyles();

  return (
    <React.Fragment>
      <MainLogo />
      <CssBaseline />
      <Container maxWidth="md">
        <Typography
          component="div"
          style={{ backgroundColor: "#F3F3F3", height: "80vh" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Paper className={classes.paper}>
                <img src="http://placeimg.com/128/128/any"></img>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell width="200px">제목</TableCell>
                    <TableCell align="center" width="auto">
                      내용
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.category}>
                      <TableCell component="th" scope="row">
                        {row.category}
                      </TableCell>
                      <TableCell align="center">{row.contents}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
