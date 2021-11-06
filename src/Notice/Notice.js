import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MainLogo from '../MainScreen/MainHeader/MainLogo'
import NoticeList from './NoticeList'
import Grid from '@material-ui/core/Grid';
import Noticewrite from './Noticewrite'

export default class Notice extends Component {
    render() {
        return (
          <div>
            <MainLogo />
            <Container maxWidth="md" style={{height:"100%", minHeight:"100vh"}}>
            
          <Grid container spacing={3}>
            <Grid item xs={7}>
            <Typography variant="body1" style={{fontSize:30, padding:20, fontWeight:"bolder"}}>
                공지사항
              </Typography>
            </Grid>
            <Grid item xs={5} align="right" style={{padding:40}}>
                <Noticewrite/>
            </Grid>
          </Grid>
                <NoticeList/>
          </Container>
          </div>
        )
    }
}
