import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    margin: 20,
  },
  pos: {
    marginBottom: 12,
  },
  search: {
    width: '95%',
    margin: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
function ReservationCard({history}) {
  const classes = useStyles();
  const [groundinfo, setgroundinfo] = useState({
    list : '',
  })
  //경기장 리스트 가져오기, 경기장 리스트 UI
  function list() {
    fetch("http://localhost:3001/reservation/list", {
                method : "post", // 통신방법
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(),
            })
            .then((res)=>res.json())
            .then((res)=>{
               setgroundinfo({
                list: res.map((data) =>
                <Card className={classes.card} key={data.ground_name} onClick={() => cardclick(data.ground_name)}>
                <CardContent>
                  <img src={data.photo} style={{float: "left", marginRight: 20}} height="130" width="200"/>
                  <Typography className={classes.content} variant="h6" component="h2" gutterBottom>
                    {data.ground_name}
                  </Typography>
                  <Typography className={classes.content} color="textSecondary">
                    {data.address}
                  </Typography>
                  <br/>
                  <Typography className={classes.content} variant="body2" component="p">
                    {data.parking_lot === "true" ? <Button variant="outlined" color="primary" style={{marginRight:10}}>주차장</Button>:<Button variant="outlined" disabled style={{marginRight:10}}>주차장</Button>}
                    {data.shower_room === "true" ? <Button variant="outlined" color="primary" style={{marginRight:10}}>샤워장</Button>:<Button variant="outlined" disabled style={{marginRight:10}}>샤워장</Button>}
                    {data.foot_rent === "true" ? <Button variant="outlined" color="primary" style={{marginRight:10}}>풋살화</Button>:<Button variant="outlined" disabled style={{marginRight:10}}>풋살화</Button>}
                    {data.wifi === "true" ? <Button variant="outlined" color="primary" style={{marginRight:10}}>WIFI</Button>:<Button variant="outlined" disabled style={{marginRight:10}}>WIFI</Button>}
                    {data.ball_rent === "true" ? <Button variant="outlined" color="primary" style={{marginRight:10}}>볼 대여</Button>:<Button variant="outlined" disabled style={{marginRight:10}}>볼 대여</Button>}
                    {data.uniform_rent === "true" ? <Button variant="outlined" color="primary" style={{marginRight:10}}>유니폼</Button>:<Button variant="outlined" disabled style={{marginRight:10}}>유니폼</Button>}
                  </Typography>
                </CardContent>
              </Card>
                ),
               })
            });
  }
  function search() {
    fetch("http://localhost:3001/reservation/search", {
      method : "POST", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body: JSON.stringify({address: "대구"}),
  })
  .then((res)=>res.json())
  .then((res)=>{
    console.log(res);
  });
  }

  //경기장 클릭 이벤트
  const cardclick = (cardkey) => {
    history.push({
        pathname: '/reservation/detail',
        state: {
            cardkey: cardkey,
        }
    });
}

  useEffect(() => {
    list();
  },[]);

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md" style={{marginTop:10}}>
      <Typography component="div" style={{ backgroundColor: '#F3F3F3', height: '90vh', paddingTop: 20}} >    
        {groundinfo.list}
      </Typography>
    </Container>
  </React.Fragment>
  );
}

export default  withRouter(ReservationCard);