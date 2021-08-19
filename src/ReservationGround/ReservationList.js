import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
                  <img src="https://ssl.pstatic.net/static/pwe/address/img_profile.png" style={{float: "left", marginRight: 20}} height="100"/>
                  <Typography className={classes.content} variant="h6" component="h2" gutterBottom>
                    {data.ground_name}
                  </Typography>
                  <Typography className={classes.content} color="textSecondary">
                    불라불라
                  </Typography>
                  <br/>
                  <Typography className={classes.content} variant="body2" component="p">
                    시설
                  </Typography>
                </CardContent>
              </Card>
                ),
               })
            });
  }

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