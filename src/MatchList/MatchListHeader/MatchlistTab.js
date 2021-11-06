import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { BrowserView, MobileView } from 'react-device-detect';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function LabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  //탭 값 가져오기
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <BrowserView>
      <Tabs 
        // TabIndicatorProps={{style: {background:"#bbdefb"}}}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab label="홈" component={Link} to='/' style={{fontFamily:"Jua", fontSize:16,}} />
        <Tab label="매칭 리스트" component={Link} to='/matchlist' style={{fontFamily:"Jua", fontSize:16}} />
        <Tab label="팀 찾기" component={Link} to='/findteam' style={{fontFamily:"Jua", fontSize:16}} />
        <Tab label="경기장 예약 / 매치 개설" component={Link} to='/reservation' style={{fontFamily:"Jua", fontSize:16}} />
      </Tabs>
      </BrowserView>
      <MobileView>
        <Tabs 
          // TabIndicatorProps={{style: {background:"#bbdefb"}}}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<HomeOutlinedIcon />} label="Home" component={Link} to='/' style={{fontFamily:"Jua", fontSize:10,}} />
          <Tab icon={<SportsSoccerIcon/>} label="Match" component={Link} to='/matchlist' style={{fontFamily:"Jua", fontSize:10}} />
          <Tab icon={<GroupsOutlinedIcon/>}label="Team" component={Link} to='/findteam' style={{fontFamily:"Jua", fontSize:10}} />
          <Tab icon={<DateRangeOutlinedIcon/>}label="Reservation" component={Link} to='/reservation' style={{fontFamily:"Jua", fontSize:10}} />
        </Tabs>
      </MobileView>
    </Paper>
  );
}