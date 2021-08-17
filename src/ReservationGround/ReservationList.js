import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    margin: 20,
  },
  pos: {
    marginBottom: 12,
  },
  search: {
    width: '95%',
    margin: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
function ReservationCard({history}) {
  const classes = useStyles();
  const [groundinfo, setgroundinfo] = useState({
    list : '',
  })
  function list() {
    fetch("http://localhost:3001/reservation/list", {
                method : "post", // 통신방법
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(),
            })
            .then((res)=>res.json())
            .then((res)=>{
               setgroundinfo({
                list: res.map((data) =>
                <Card className={classes.card} key={data.ground_name} onClick={() => cardclick(data.ground_name)}>
                <CardContent>
                  <img src="https://ssl.pstatic.net/static/pwe/address/img_profile.png" style={{float: "left", marginRight: 20}} height="100"/>
                  <Typography className={classes.content} variant="h6" component="h2" gutterBottom>
                    {data.ground_name}
                  </Typography>
                  <Typography className={classes.content} color="textSecondary">
                    불라불라
                  </Typography>
                  <br/>
                  <Typography className={classes.content} variant="body2" component="p">
                    시설
                  </Typography>
                </CardContent>
              </Card>
                ),
               })
            });
  }

  const cardclick = (cardkey) => {
    history.push({
        pathname: '/reservation/detail',
        state: {
            cardkey: cardkey,
        }
    });
}

  useEffect(() => {
    list();
  },[]);

  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="md" style={{marginTop:10}}>
      <Typography component="div" style={{ backgroundColor: '#F3F3F3', height: '90vh', paddingTop: 20}} >
      <div className={classes.search}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>지역</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>선택된 지역</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="서울" onDelete={() => {}} />
            <Chip label="대구" onDelete={() => {}} />
            <Chip label="부산" onDelete={() => {}} />
            <Chip label="대전" onDelete={() => {}} />
            <Chip label="제주도" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              <a href="#secondary-heading-and-columns" className={classes.link}>
                지역추가하기
              </a>
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">취소</Button>
          <Button size="small" color="primary">
            검색
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
    {groundinfo.list}
      </Typography>
    </Container>
  </React.Fragment>
  );
}

export default  withRouter(ReservationCard);