import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginRight:10,
  },
  title: {
    fontSize: 14,
  },
  pos: {},
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

export default function MainScreen_Teaminfo() {
  const classes = useStyles();

  return (
    <div>
      <p>내 팀 정보</p>
      <Card className={classes.root}>
        <CardContent>
            <Grid container spacing={3}>
            <Grid item xs={3}>
            <Avatar alt="Temp" className={classes.large}>
              Girin
            </Avatar>
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="h5"
              component="h2"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              기린축구팀
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              11명 / 프로페셔널 / 2020.07.19
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              대구광역시 달서구
            </Typography>
            <br/>
          </Grid>
            </Grid>
          
        </CardContent>
      </Card>
    </div>
  );
}
