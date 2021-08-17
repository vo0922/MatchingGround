import React, { Component, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MainLogo from '../MainScreen/MainHeader/MainLogo'
import { withRouter } from 'react-router-dom';

function ReservationDetail({location}) {
    const [ground, setground] = useState({
        title: '',
        content: '',
    });

    const reqground = () => {
        fetch("http://localhost:3001/reservation/detail", {
            method: "post", //통신방법
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(location.state),
        })
            .then((res) => res.json())
            .then((res) => {
                setground({
                    title: res[0].ground_name,
                    content: res[0].grund_address,
                })
            });
    };

    useEffect(() => {
        reqground();
    },[])

  return (
    <React.Fragment>
    <MainLogo/>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography component="div" style={{ backgroundColor: 'white', height: '100vh' }} >
            <h1>{ground.title}</h1>
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(ReservationDetail)