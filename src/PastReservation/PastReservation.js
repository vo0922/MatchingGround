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
        <Container maxWidth="md">
          <Typography
            component="div"
            style={{
              minHeight: "100vh",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Reservation_current />
            <Reservation_past />
          </Typography>
        </Container>
      </div>
    );
  }
}
