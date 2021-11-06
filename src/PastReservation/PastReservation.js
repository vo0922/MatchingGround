import React, { Component } from "react";
import { Typography, Container } from "@material-ui/core";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import Reservation_current from "./Reservation_current";
import Reservation_past from "./Reservation_past";

export default class PastReservation extends Component {
  render() {
    return (
      <div>
        <MainLogo />
        <Container maxWidth="md" 
            style={{
              minHeight: "100vh",
              height:"100%"
            }}>
            <Reservation_current />
            <Reservation_past />
        </Container>
      </div>
    );
  }
}
