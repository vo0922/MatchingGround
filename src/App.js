import { Route,withRouter, Link, Switch } from 'react-router-dom';
import Router from './Router/Router'
import React, { Component } from 'react';

function App() {
   return (
     <div className="App">
       <Router/>
     </div>
    );
}

export default withRouter(App);
