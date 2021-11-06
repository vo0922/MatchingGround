import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import { CssBaseline, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@material-ui/core";
import { BrowserView, MobileView } from "react-device-detect"

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
    maxHeight: 512,
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
    phonenum : "",
    photo : "",
    parking_lot : "",
    shower_room : "",
    foot_rent : "",
    wifi : "",
    ball_rent : "",
    uniform_rent : "",
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
          phonenum:json[0].phonenum,
          photo : json[0].photo,
          parking_lot : json[0].parking_lot,
          shower_room : json[0].shower_room,
          foot_rent : json[0].foot_rent,
          wifi : json[0].wifi,
          ball_rent : json[0].ball_rent,
          uniform_rent : json[0].uniform_rent,
        });
        
      });
  };

  function createData(category, contents) {
    return { category, contents };
  }

  const rows = [
    createData("경기장이름", groundinfo.ground_name),
    createData("경기장주소", groundinfo.address),
    createData("전화번호", groundinfo.phonenum),
    createData("구장 수", groundinfo.ground_count + " 개"),
    createData("가격", groundinfo.price + " 원"),
  ];

  function link_reservation(){
    history.push({
      pathname:"/groundmanager/managereservation",
      state:{
        groundinfo:groundinfo,
      },
    });
  }

  function link_Modify(){
    history.push({
      pathname:"/groundmanager/modify",
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
      <Container maxWidth="md" style={{minHeight:"100vh", height:"100%"}}>          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography style={{textAlign:"center", marginTop:25, marginBottom:25, fontSize:45}}>
                {groundinfo.ground_name}
              </Typography>
            </Grid>  
            
            <Grid container item xs={12} justifyContent="center" alignItems="center" direction="column">
                <BrowserView>
                  <img src={groundinfo.photo} height="450"></img>
                </BrowserView>
                <MobileView>
                  <img src={groundinfo.photo} width="100%"></img>
                </MobileView>
            </Grid>
              <Grid item xs={12} sm={6}>
                <Typography component="h6" variant="h6">경기장 정보</Typography>
                <Table className={classes.table} aria-label="simple table">
                  
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.category}>
                        <TableCell component="th" scope="row" style={{fontSize:16}}>
                          {row.category}
                        </TableCell>
                        <TableCell align="center" style={{fontSize:16}}>{row.contents}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography component="h6" variant="h6" >편의 시설</Typography>
                <BrowserView>
                {groundinfo.parking_lot === "true" ? <img src="icons/icon_parking.png" style={{ width: 80, height: 80, margin:30}}/> : null}
                {groundinfo.shower_room === "true" ? <img src="icons/icon_shower.png" style={{ width:80, height:80, margin:30}}/> : null}
                {groundinfo.foot_rent === "true" ? <img src="icons/icon_shoe.png" style={{ width:80, height:80,  margin:30}}/> : null}
                {groundinfo.wifi === "true" ? <img src="icons/icon_wifi.png" style={{ width:80, height:80, margin:30}}/> : null}
                {groundinfo.ball_rent === "true" ? <img src="icons/icon_ball.png" style={{ width:80, height:80, margin:30}}/> : null}
                {groundinfo.uniform_rent === "true" ? <img src="icons/icon_uniform.png" style={{ width:80, height:80, margin:30}}/> : null}
                </BrowserView>
                <MobileView>
                {groundinfo.parking_lot === "true" ? <img src="icons/icon_parking.png" style={{ width: "25%", height: "25%", margin:10}}/> : null}
                {groundinfo.shower_room === "true" ? <img src="icons/icon_shower.png" style={{ width: "25%", height: "25%", margin:10}}/> : null}
                {groundinfo.foot_rent === "true" ? <img src="icons/icon_shoe.png" style={{ width: "25%", height: "25%", margin:10}}/> : null}
                {groundinfo.wifi === "true" ? <img src="icons/icon_wifi.png" style={{ width: "25%", height: "25%", margin:10}}/> : null}
                {groundinfo.ball_rent === "true" ? <img src="icons/icon_ball.png" style={{ width: "25%", height: "25%", margin:10 }}/> : null}
                {groundinfo.uniform_rent === "true" ? <img src="icons/icon_uniform.png" style={{ width: "25%", height: "25%", margin:10}}/> : null}
                </MobileView>
              </Grid>
            <Grid item xs={3}/>
            <Grid item xs={3} style={{marginTop:20}}>
                <Button onClick={link_Modify} variant="outlined" color="primary" style={{ width: "100%" }}>경기장 정보 수정</Button>
            </Grid>
            <Grid item xs={3} style={{marginTop:20}}>
                <Button onClick={link_reservation} variant="outlined" color="primary" style={{ width: "100%" }}>경기장 예약 관리</Button>
            </Grid>
          </Grid>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(GroundManager);