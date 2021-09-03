import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { CssBaseline, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
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
    width: 256,
    height: 256,
  },
  table: {
    marginTop: 10,
    maxwidth: "auto",
  },
});


function GroundManager({history}) {
  const [groundinfo, setgroundinfo] = useState({
    ground_name: "",
    address: "",
    ground_count: "",
    price: "",
    manager_id : window.sessionStorage.getItem('id'),
    photo : "",
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
        console.log(json);
        setgroundinfo({
          ground_name: json[0].ground_name,
          address: json[0].address,
          ground_count: json[0].ground_count,
          price: json[0].price,
          manager_id: groundinfo.manager_id,
          photo : json[0].photo,
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

  function link_reservation(){
    history.push({
      pathname:"/groundmanager/managereservation",
      state:{
        groundinfo:groundinfo,
      },
    });
  }

   useEffect(() => {
     getgroundinfo();
   }, []);


  const classes = useStyles();

  return (
    <React.Fragment>
      <MainLogo />
      <CssBaseline />
      <Container maxWidth="md" style={{backgroundColor : "#F3F3F3"}}>
        <Typography
          component="div"
          style={{ height: "100vh" }}
        >
          
          <Grid container spacing={3}>
            <Grid item xs={3}/>
            <Grid item xs={6}>
              <Typography component="h4" variant="h4" style={{textAlign:"center"}}>
                {groundinfo.ground_name} 경기장
              </Typography>
            </Grid>  
            <Grid item xs={3}/>
            
            <Grid item xs={3}/>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <img src={groundinfo.photo} height="256px" width="256px"></img>
              </Paper>
            </Grid>
            <Grid item xs={3}/>
            <Grid item xs={12}>
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
            <Grid item xs={3}/>
            <Grid item xs={3}>
              <Link to="/groundmanager/modify">
                <Button variant="outlined" color="primary" style={{ width: "100%" }}>경기장 정보 수정</Button>
              </Link>
            </Grid>
            <Grid item xs={3}>
                <Button onClick={link_reservation} variant="outlined" color="primary" style={{ width: "100%" }}>경기장 예약 관리</Button>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(GroundManager);