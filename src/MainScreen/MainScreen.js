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
import MainScreen_slick from "./MainScreen_slick"
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import {
  BrowserView,
  MobileView,
  isMobile,
  isBrowser,
} from "react-device-detect";

export default class MainScreen extends Component {
  render() {
    return (
      <div style={{ backgroundImage: "" }}>
        <React.Fragment>
          <MainHeader />
          <CssBaseline />
          <Container 
                  maxWidth="md"
                  style={{marginTop: 25, minHeight:"100vh", height:"100%"}}>
              <Grid container spacing={6}>
                <Grid item xs>
                  <MainScreen_Myinfo />
                </Grid>
                <Grid item xs>
                  <MainScreen_Teaminfo />
                </Grid>
                <Grid item xs={12}>
                  <BrowserView>
                  <MainScreen_slick/>
                  </BrowserView>
                </Grid>
                <Grid item xs={12}>
                  <MainScreen_Matchlist />
                </Grid>
              </Grid>
          </Container>
        </React.Fragment>
      </div>
    );
  }
}
