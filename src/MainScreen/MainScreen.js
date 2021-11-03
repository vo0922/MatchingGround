import React, { Component } from "react";
import MainHeader from "./MainHeader/MainHeader";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MainScreen_Myinfo from "./MainScreen_Myinfo";
import MainScreen_Teaminfo from "./MainScreen_Teaminfo";
import MainScreen_Matchlist from "./MainScreen_Matchlist";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";


export default class MainScreen extends Component {
  render() {
    return (
      <div style={{ backgroundImage: "url(backgroundimage/background1.jpg)" }}>
        <MainHeader />
        <React.Fragment>
          <CssBaseline />
          
          <Container maxWidth="md" style={{ marginTop: 25,}} >
            <Typography
              component="div"
              style={{
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
              }}
            >
              <Grid container spacing={6}>
                <Grid item xs={6}>                
                  <MainScreen_Myinfo/>          
                </Grid>
                <Grid item xs={6}>
                  <MainScreen_Teaminfo/>
                </Grid>
                <Grid item xs={12} style={{marginTop:10, marginBottom:10}}>
                  <img width="100%" height="300px" src="backgroundimage/background2.jpg"/>
                </Grid>
                <Grid item xs={12}>
                  <MainScreen_Matchlist/>
                </Grid>
              </Grid>
            </Typography>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}
