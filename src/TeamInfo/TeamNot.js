import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter,Link } from 'react-router-dom';
import { Card, CardContent, Grid, Container, Typography, Button } from '@material-ui/core';
import MainLogo from '../MainScreen/MainHeader/MainLogo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Button: {
      width: "0%"
  },
  title: {
    fontSize: 24,
  },
}));



function TeamMain({history}) {
  const classes = useStyles();

  const click_teammake = () => {
    history.push("/teammake")
  }

  const click_teamfind = () => {
      history.push("/teamfind")
  };


  return (
    <Container maxWidth="md">
      <MainLogo/>
      <Typography className={classes.title}>내 팀 정보</Typography>

      <Container
        maxWidth="md"
        style={{ backgroundColor: "#cfe8fc", padding: "10%" }}
      >
        <Typography component="div" style={{ height: "50%" }}>
          <Grid item xs={12} />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={3}>              
                <Button
                  id="teammake"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={click_teammake}
                >
                  팀 만들기
                </Button>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={3}>
              <Button
                id="teamfind"
                variant="contained"
                color="primary"
                fullWidth
                onClick={click_teamfind}
              >
                팀 가입하기
              </Button>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </Container>
  );
}


export default withRouter(TeamMain);