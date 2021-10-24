import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import MainLogo from '../MainScreen/MainHeader/MainLogo'
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Matchinglist from './Matchinglist';
import Matchedlist from './Matchedlist';
import Matchwatelist from './Matchwatelist';
export default class MatchInfo extends Component {
    render() {
        return (
            <div>
        <MainLogo />
        <Container maxWidth="md" style={{backgroundColor : "white"}}>
          <Typography
              component="div"
              style={{ minHeight:'100vh',height: "100%" }}
            >
          <Grid 
          container spacing={3}
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          >
            <Grid>
            <Typography component="div" style={{fontSize:20, padding:40, fontWeight:"bolder"}}>
                진행중인 매칭
              </Typography>
            </Grid>
            <Grid style={{width:'100%'}}>
                <Matchinglist />
            </Grid>
            <Grid style={{marginTop:10}}>
            <Typography component="div" style={{fontSize:20, fontWeight:"bolder", marginTop:50}}>
                대기중인 매칭
              </Typography>
            </Grid>
            <Grid style={{width:'100%'}}>
                <Matchwatelist />
            </Grid>
            <Grid style={{marginTop:10}}>
            <Typography component="div" style={{fontSize:20, fontWeight:"bolder", marginTop:50}}>
                지난 매칭
              </Typography>
            </Grid>
            <Grid style={{width:'100%'}}>
                <Matchedlist />
            </Grid>
          </Grid>
          </Typography>
        </Container>
            </div>
        )
    }
}
