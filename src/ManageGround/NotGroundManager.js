import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MainLogo from "../MainScreen/MainHeader/MainLogo";
import Button from '@material-ui/core/Button';


export default function NotGroundManager() {
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
            <h2>
              경기장 관리자가 아닙니다. 경기장을 등록하시려면 경기장 등록 버튼을 눌러주세요.
            </h2>
            <Button variant="outlined" color="primary">
              경기장 등록 신청하기
            </Button>
          </Typography>
        </Container>
      </React.Fragment>
    </div>
  )
}
