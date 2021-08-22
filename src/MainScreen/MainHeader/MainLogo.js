import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Accessibility from '@material-ui/icons/Accessibility'
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Report from '@material-ui/icons/Report';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';
import { withRouter,Link } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { ThemeProvider } from '@material-ui/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const drawerWidth = 240;
const color = grey[50];
const themelogo = createTheme({
    palette: {
      primary: {
        main: color,
      },
      secondary: {
        main: '#fafafa',
      },
    },
  });
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

function PersistentDrawerRight({history}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clickaction = (text) => {
    if(text==='내 정보'){
      history.push('/myinfo');
    }else if(text==='내 팀정보'){
      history.push('/teaminfo');
    }else if(text==='로그아웃'){
      window.sessionStorage.clear();
      history.push('/Login');
    }
  };

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <ThemeProvider theme={themelogo}>
      <AppBar 
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        <Link to = "/"><HomeIcon color="action"/></Link>
          <Typography variant="h6" noWrap className={classes.title}>
            &nbsp;&nbsp; 매칭그라운드
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <main>
        <div className={classes.drawerHeader} />
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        {['내 정보', '내 팀정보', '내 매칭정보'].map((text, index) => (
          <ListItem button key={text} onClick={()=>{clickaction(text)}}>
            <ListItemIcon>
            {index===0 && <Accessibility/>}
            {index===1 && <PeopleAlt/>}
            {index===2 && <FormatListBulletedIcon/>}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['공지사항', '경기장 관리'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index===0 && <Report/>}
              {index===1 && <ArtTrackIcon/>} 
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['로그아웃'].map((text, index) => (
          <ListItem button key={text} onClick={()=>{clickaction(text)}}>
            <ListItemIcon>
              {index===0 && <ExitToApp/>} 
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      </Drawer>
    </div>
  );
}

export default withRouter(PersistentDrawerRight);