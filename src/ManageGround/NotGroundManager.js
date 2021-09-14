import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import {
  Grid,
  CssBaseline,
  Typography,
  Container,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    width:"100%",
  },
}));

export default function NotGroundManager() {
  const classes = useStyles();
  return (
    <div>
      <React.Fragment>
        <MainLogo />
        <CssBaseline />
        <Container maxWidth="md">
          <Typography
            component="div"
            style={{ backgroundColor: "#F3F3F3", height: "80vh" }}
          >
            <Typography
              component="h6"
              variant="h6"
              style={{ textAlign: "center", marginTop: 10 }}
            >
              경기장 관리자가 아닙니다. 경기장을 등록하시려면 경기장 등록 버튼을
              눌러주세요.
            </Typography>
            
              <Grid container spacing={3}>
                <Grid item xs />
                <Grid item xs={6}>
                  <Link to="/groundregister">
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      size="large"
                    >
                      경기장 등록 신청하기
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs />
              </Grid>
            
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  );
}
