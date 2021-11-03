import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function LabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab label="홈" component={Link} to='/' style={{fontFamily:"Jua", fontSize:16}} />
        <Tab label="매칭 리스트" component={Link} to='/matchlist' style={{fontFamily:"Jua", fontSize:16}} />
        <Tab label="팀 찾기" component={Link} to='/findteam' style={{fontFamily:"Jua", fontSize:16}} />
        <Tab label="경기장 예약" component={Link} to='/reservation' style={{fontFamily:"Jua", fontSize:16}} />
      </Tabs>
    </Paper>
  );
}