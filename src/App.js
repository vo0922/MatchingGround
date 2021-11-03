import { Route,withRouter, Link, Switch } from 'react-router-dom';
import Router from './Router/Router'
import React, { Component } from 'react';
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
//import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Gamja_Flower',
    ],
    h1:{
      fontFamily:[
        'Dongle-Reqular',
      ],
    },
    h2:{
      fontFamily:[
        'Dongle-Reqular',
      ],
    },
    h3:{
      fontFamily:[
        'Dongle-Reqular',
      ],
    },
    h4:{
      fontFamily:[
        'ELAND_B',
      ],
    },
    h5:{
      fontFamily: [
        'Jua',
      ],
    },
    h6:{
      fontFamily: [
        'Jua',
      ]
    },
    subtitle1:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    subtitle2:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    body1:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    body2:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    button:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    caption:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
    overline:{
      fontFamily: [
        'Gamja_Flower',
      ]
    },
  },
});

function App() {
   return (
     <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
     </div>
    );
}

export default withRouter(App);
